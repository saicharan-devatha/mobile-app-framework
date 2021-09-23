module.exports = function (grunt) {
    process.setMaxListeners(0);
    let os = require('os');
    let env = grunt.option('env');
    let run = grunt.option('run');
    let product = grunt.option('product');
    let type = grunt.option('type');
    let applienabled = grunt.option('applienabled');
    let parallel = grunt.option('parallel');
    let exeEnv = grunt.option('exeEnv');
    let data = grunt.option('data');
    let suitetype = grunt.option('suitetype');
    let commons = require('./config/commons.js');
    let ilist = commons.ilist.recipients.toString();
    let pac, generatedtunnelName;
    let nodemailer = require('nodemailer');
    let {join} = require('path');
    const request = require('sync-request');
    const fs = require('fs');
    env !== "prod" ? pac = commons.proxies[env].proxyUrl : pac = "";
    let buildNumber = process.env.BUILD_NUMBER;
    if (!buildNumber) {
        generatedtunnelName = "pos_tunnel";
        buildNumber = "00";
    } else {
        generatedtunnelName = "pos-ui-" + env + "-" + suitetype + "-" + buildNumber;
    }
    let sauceconnect_vv = (process.env.SAUCECONNECT_VERY_VERBOSE !== undefined);
    commons.appDetails.ios.repo_path = (process.env.REPO_PATH !== undefined) ? process.env.REPO_PATH : commons.appDetails.ios.repo_path;
    commons.appDetails.android.repo_path = (process.env.REPO_PATH !== undefined) ? process.env.REPO_PATH : commons.appDetails.android.repo_path;

    let emailSubject = 'Automation Report:' + ' [POS - ' + suitetype.toUpperCase() + ' : ' + env.toUpperCase() + ']' + ' [Build#:' + buildNumber + ']';
    applienabled = applienabled === undefined ? false : applienabled.trim().toLowerCase() === "yes";

    let config_reader = require('./config/groups.js');
    let devices = config_reader.configure[type].devices;
    let devices_to_test = [];
    devices.forEach(function (device) {
        if (device.trim().toLowerCase().indexOf('android') !== -1) {
            devices_to_test.push('android');
        }
        if (device.trim().toLowerCase().indexOf('ios') !== -1) {
            devices_to_test.push('ios');
        }
    });

    console.log('--> AppliTools Enabled : ', applienabled);

    process.env.webdriveroptions = JSON.stringify({
        env: env,
        run: run,
        type: type,
        product: product,
        parallel: parallel,
        exeEnv: exeEnv,
        data: data,
        tunnel: generatedtunnelName,
        applienabled: applienabled,
        maxinstances: devices_to_test.length
    });

    let portfinder = require('portfinder');
    let transporter = nodemailer.createTransport({
        type: 'SMTP',
        service: "Gmail",
        auth: {
            user: '',
            pass: ''
        }
    });
    let mailOptions = {
        from: '" POS Automation " <>', //sender address
        to: ilist
    };

    grunt.loadNpmTasks('grunt-shell-spawn');
    grunt.loadNpmTasks('grunt-webdriver');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-curl');
    require('load-grunt-tasks')(grunt);

    // ------ Download the required apps -------- //
    if (process.env.ARTIFACTORY_HOST !== undefined) {
        commons.appDetails.ios.host = String(process.env.ARTIFACTORY_HOST).trim();
    }

    let config = {
        mkdir: {
            all: {
                options: {
                    mode: '0700',
                    create: ['results']
                },
            },
        },
        webdriver: {
            test: {
                configFile: './config/wdio.conf.js'
            }
        },
        shell: {
            checkProcess: {
                command: 'ps aux | grep -v grep | grep "bin/sc"',
                options: {
                    stderr: true,
                    callback: startDynamicTunnel
                }
            },
            appium_shutdown: {
                options: {
                    stdout: true
                },
                command: 'kill $(lsof -i :4723 | tail -n 1 | awk \'{print $2}\')'
            },
            appium_start: {
                options: {
                    stdout: true,
                    async: true
                },
                command: 'appium &'
            },
            checkProcess_kill: {
                options: {
                    stdout: true
                },
                command: 'kill $(ps aux | grep -v grep | grep "bin/sc" |  awk \'{ print $2 }\')'
            },
            generate_allure_report: {
                options: {
                    stdout: true
                },
                command: './node_modules/allure-commandline/bin/allure -q generate --clean'
            },
            generate_html_report: {
                options: {
                    stdout: true
                },
                command: './node_modules/junit-viewer/bin/junit-viewer --results=junit-results --save=report.html'
            },
            generate_xunit_html_report: {
                options: {
                    stdout: true
                },
                command: './node_modules/xunit-viewer/bin/xunit-viewer -r ./junit-results'
            }
        },
        concurrent: {
            init: {
                tasks: [],
                options: {
                    limit: 10,
                    logConcurrentOutput: true
                }
            },
            retry: {
                tasks: [],
                options: {
                    limit: 10,
                    logConcurrentOutput: true
                }
            }
        },
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['**/*.js'],
                    dest: 'dist/',
                    ext: '.js'
                }]
            }
        },
        clean: {
            folder: ['apps', 'dist', 'results', 'allure-report', 'allure-results', 'junit-results'],
            files: ['*.xml', "*.html", "retry.js", "ptor-final*.json"]
        },
        curl: {
            iOSAppDownload: {
                src: String(commons.appDetails.ios.protocol).trim() + String(commons.appDetails.ios.host).trim() + String(commons.appDetails.ios.repo_path).trim(),
                dest: join(process.cwd(), './apps/ios/', String(commons.appDetails.ios.repo_path).match(/\/([-a-zA-Z_0-9\.]*\.zip$)/)[0]),
            },
            androidAppDownload: {
                src: String(commons.appDetails.android.protocol).trim() + String(commons.appDetails.android.host).trim() + String(commons.appDetails.android.repo_path).trim(),
                dest: join(process.cwd(), './apps/android/', String(commons.appDetails.android.repo_path).match(/\/([-_a-zA-Z_0-9\.]*\.zip$)/)[0])
            }
        },
        unzip: {
            iOSAppUnZip: {
                src: join(process.cwd(), './apps/ios/', String(commons.appDetails.ios.repo_path).match(/\/([-a-zA-Z_0-9\.]*\.zip$)/)[0]),
                dest: unzip('ios')
            },
            androidAppUnZip: {
                src: join(process.cwd(), './apps/android/', String(commons.appDetails.android.repo_path).match(/\/([-_a-zA-Z_0-9\.]*\.zip$)/)[0]),
                dest: unzip('android')
            }
        }
    };

    grunt.config.init(config);

    function unzip(platform) {
        let extract_to_folder = process.env.EXTRACT_TO_FOLDER !== undefined ? process.env.EXTRACT_TO_FOLDER : '';
        if (extract_to_folder.trim() === '') {
            return join(process.cwd(), './apps/', platform, '/')
        } else {
            return join(process.cwd(), './apps/', platform, '/', extract_to_folder);
        }
    }

    function startDynamicTunnel(err, stdout, stderr, cb) {
        if (err) {
            let ports = [];
            portfinder.getPortPromise({
                port: 29999,
                stopPort: 30099
            }).then(function (port) {
                ports.push(port);
                return portfinder.getPortPromise({
                    port: 4445,
                    stopPort: 4545
                });
            }).then(function (port) {
                ports.push(port);
                console.log(' --- available port for scproxy : ', ports[0]);
                console.log(' --- available port for seport : ', ports[1]);
                grunt.config.set('scproxy', ports[0]);
                grunt.config.set('seport', ports[1]);
                cb();
            });
        } else {
            let ports = [];
            portfinder.getPortPromise({
                port: 29999,
                stopPort: 30099
            }).then(function (port) {
                ports.push(port);
                return portfinder.getPortPromise({
                    port: 4445,
                    stopPort: 4545
                });
            }).then(function (port) {
                ports.push(port);
                console.log(' --- available port for scproxy : ', ports[0]);
                console.log(' --- available port for seport : ', ports[1]);
                grunt.config.set('scproxy', ports[0]);
                grunt.config.set('seport', ports[1]);
                cb();
            });
        }
    }

    grunt.registerTask('upload_app_to_saucestorage', function (appFilePath) {
        let downloadAppReadStream = fs.readFileSync(appFilePath);
        const stats = fs.statSync(appFilePath);
        const fileSizeInBytes = stats.size;
        let base64encodedData = Buffer.from(commons.sauce.user + ':' + commons.sauce.key).toString('base64');
        let options = {
            qs: {"overwrite": true},
            headers: {
                'Content-Type': 'application/octet-stream',
                'Content-Length': fileSizeInBytes,
                'Authorization': 'Basic ' + base64encodedData
            },
            body: downloadAppReadStream
        };

        if (appFilePath.trim().toLowerCase().indexOf('android') !== -1) {
            console.log('--> Uploading the Android app : ', appFilePath, ' to sauce storage. ', 'https://saucelabs.com/rest/v1/storage/' + commons.sauce.user + '/' + String(commons.appDetails.android.app_name)); //apk to be uploaded
            let res = request('POST', 'https://saucelabs.com/rest/v1/storage/' + commons.sauce.user + '/' + String(commons.appDetails.android.app_name), options);
            console.log('--> Uploaded the Android app to sauce storage.', res);
        }

        if (appFilePath.trim().toLowerCase().indexOf('ios') !== -1) {
            console.log('--> Uploading the iOS app : ', appFilePath, ' to sauce storage. ', 'https://saucelabs.com/rest/v1/storage/' + commons.sauce.user + '/' + String(commons.appDetails.ios.repo_path).match(/([-a-zA-Z_0-9\.]*\.zip$)/)[0]);
            let res = request('POST', 'https://saucelabs.com/rest/v1/storage/' + commons.sauce.user + '/' + String(commons.appDetails.ios.repo_path).match(/([-a-zA-Z_0-9\.]*\.zip$)/)[0], options);
            console.log('--> Uploaded the iOS app to sauce storage.', res);
        }

    });

    grunt.registerTask('exe', function () {
        if (exeEnv === "local") {
            // grunt.task.run('shell:appium_shutdown');
            // grunt.task.run('shell:appium_start');
        }

        // ------- Cleanup Workspace --------//
        grunt.task.run('clean');

        // ------ Create Output directory --------//
        grunt.task.run('mkdir');
        grunt.task.run('babel');

        if (devices_to_test.includes('ios')) {
            console.log('--> Downloading iOS artifact from repository : ', commons.appDetails.ios.protocol + commons.appDetails.ios.host + commons.appDetails.ios.repo_path);
        }

        if (devices_to_test.includes('android')) {
            console.log('--> Downloading Android artifact from repository : ', commons.appDetails.android.protocol + commons.appDetails.android.host + commons.appDetails.android.repo_path);
        }

        if (devices_to_test.includes('ios')) {
            grunt.task.run('curl:iOSAppDownload');
            grunt.task.run('unzip:iOSAppUnZip');
        }

        if (devices_to_test.includes('android')) {
            grunt.task.run('curl:androidAppDownload');
            grunt.task.run('unzip:androidAppUnZip');
        }

        // ------ Start Sauce Tunnel  --------//
        if (exeEnv === "sauce") {
            if (devices_to_test.includes('ios')) {
                grunt.task.run('upload_app_to_saucestorage:' + join(process.cwd(), './apps/ios/', String(commons.appDetails.ios.repo_path).match(/([-a-zA-Z_0-9\.]*\.zip$)/)[0]));
            }

            if (devices_to_test.includes('android')) {
                grunt.task.run('upload_app_to_saucestorage:' + join(process.cwd(), './apps/android/RELEASE_ENDPOINT/release/', String(commons.appDetails.android.app_name)));
            }

            if (os.platform().trim().toLowerCase() === "darwin") {
                console.log('--> Killing sauce connect only for mac os.');
                grunt.task.run('shell:checkProcess_kill');
            }
            grunt.task.run('shell:checkProcess');
        }

        // ------ Start Tests --------//

        grunt.config('concurrent.init.tasks', ['webdriver:test']);

        grunt.task.run('concurrent:init');
        grunt.task.run('shell:generate_allure_report');
        grunt.task.run('shell:generate_html_report');
        grunt.task.run('shell:generate_xunit_html_report');

        grunt.registerTask('sendemail', function () {
            console.log("Generated Email Subject : " + emailSubject);

            // ------ Stop Tunnel --------//
            if (exeEnv === "sauce") {
                grunt.task.run('sauce_tunnel_stop');
            }
            // ------ Send Mail --------//
            mailOptions.subject = emailSubject;

            mailOptions.html = require("fs").readFileSync('report.html').toString();
            //mailOptions.html = {path: 'report.html'};

            let done = this.async();
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    return console.log(error);
                }
                console.log('Message sent: %s', info.messageId);
            });
            setTimeout(function () {
                done();
            }, 15000);
        });
        grunt.task.run('sendemail');
    });
};