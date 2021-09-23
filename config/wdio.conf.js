'use strict';

let commons = require('./commons.js');
let builder = require('../lib/builder.js');
let groups = require('../config/groups');
let {join} = require('path');
let Promise = require('promise');
let params = JSON.parse(process.env.webdriveroptions);

let env = params.env;
let run = params.run;
let type = params.type;
let product = params.product;
let exeEnv = params.exeEnv;
let tunnel = params.tunnel;
let maxinstances = params.maxinstances;

let desiredCapabilities = builder.builder_run(type, run, product, env, exeEnv, tunnel);

let config = {
    // ==================================
    // Where should your test be launched
    // ==================================
    //
    runner: 'local',

    //
    // ==================
    // Specify Test Files
    // ==================
    // Define which test specs should run. The pattern is relative to the directory
    // from which `wdio` was called. Notice that, if you are calling `wdio` from an
    // NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
    // directory is where your package.json resides, so `wdio` will be called from there.
    //

    specs: groups.configure[type].specs,

    //
    // If you have trouble getting all important capabilities together, check out the
    // Sauce Labs platform configurator - a great tool to configure your capabilities:
    // https://docs.saucelabs.com/reference/platforms-configurator
    //
    capabilities: desiredCapabilities,

    //
    // Additional list of node arguments to use when starting child processes
    execArgv: [],
    //
    // ===================
    // Test Configurations
    // ===================
    // Define all options that are relevant for the WebdriverIO instance here
    //
    // Level of logging verbosity: trace | debug | info | warn | error | silent
    logLevel: 'info',
    //
    // Set specific log levels per logger
    // use 'silent' level to disable logger
    logLevels: {
        webdriver: 'info'
    },
    //
    // Set directory to store all logs into
    outputDir: join(process.cwd(), './logs/'),
    //
    // If you only want to run your tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
    bail: 0,

    //
    // Default timeout for all waitForXXX commands.
    waitforTimeout: 10000,

    // Framework you want to run your specs with.
    // The following are supported: mocha, jasmine and cucumber
    // see also: https://webdriver.io/docs/frameworks.html
    //
    // Make sure you have the wdio adapter package for the specific framework installed before running any tests.
    framework: 'jasmine',
    //
    // The number of times to retry the entire specfile when it fails as a whole
    specFileRetries: 1,
    //
    // Test reporter for stdout.
    // The only one supported by default is 'dot'
    // see also: https://webdriver.io/docs/dot-reporter.html and click on "Reporters" in left column
    reporters: ['dot', 'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: true,
        }],
        ['junit', {
            outputDir: './junit-results/',
            outputFileFormat: function (options) {
                return 'junit-output-' + options.cid + '.xml'
            }
        }]
    ],

    // Options to be passed to Jasmine.
    // See also: https://github.com/webdriverio/webdriverio/tree/master/packages/wdio-jasmine-framework#jasminenodeopts-options
    jasmineNodeOpts: {
        //
        // Jasmine default timeout
        defaultTimeoutInterval: 900000,
        //
        // The Jasmine framework allows it to intercept each assertion in order to log the state of the application
        // or website depending on the result. For example it is pretty handy to take a screenshot every time
        // an assertion fails.
        expectationResultHandler: function (passed, assertion) {
            // do something
        },
        //
        // Make use of Jasmine-specific grep functionality
        grep: null,
        invertGrep: null
    },

    sync: true,
    coloredLogs: true,
    screenshotPath: './errorShots/',
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,
    // appium: {
    //     waitStartTime: 3000,
    //     command: 'appium',
    //     logFileName: 'appium190.log',
    //     args: {
    //         address: '127.0.0.1',
    //         port: 4723,
    //         newCommandTimeout: '7200',
    //         sessionOverride: true,
    //         debugLogSpacing: true,
    //     }
    // }

    //
    // =====
    // Hooks
    // =====
    // WebdriverIO provides a several hooks you can use to interfere the test process in order to enhance
    // it and build services around it. You can either apply a single function to it or an array of
    // methods. If one of them returns with a promise, WebdriverIO will wait until that promise got
    // resolved to continue.
    //

    /**
     * Gets executed once before all workers get launched.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     */
    onPrepare: function (config, capabilities) {
    },
    /**
     * Gets executed just before initialising the webdriver session and test framework. It allows you
     * to manipulate configurations depending on the capability or spec.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    beforeSession: function (config, capabilities, specs) {
        let platform = capabilities["platformName"];
        if (specs.length == 1) {
            let specNameInput = specs[0];

            groups.configure.overrideCapabilities.forEach(item => {
                let foundInd = item.specNames.findIndex(specNames => {
                    return specNameInput.includes(specNames)
                });
                if (foundInd !== -1 && platform.toLowerCase().trim().includes(item.platform)) {
                    Object.keys(item.capabilities).forEach(key => {
                        capabilities[key] = item.capabilities[key]
                    });
                }
            });
        }
    },
    /**
     * Gets executed before test execution begins. At this point you can access to all global
     * variables like `browser`. It is the perfect place to define custom commands.
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that are to be run
     */
    before: function (capabilities, specs) {
        browser.setTimeout({'implicit': 60000}).catch(function (err) {
            console.log('Error in setting the timeout object (in before) : ', {'implicit': 60000}, err);
            return Promise.resolve();
        }).then(function () {
            return browser.setTimeout({'pageLoad': 60000});
        }).catch(function (err) {
            console.log('Error in setting the timeout object (in before) : ', {'pageLoad': 60000}, err);
        });
    },
    /**
     * Hook that gets executed before the suite starts
     * @param {Object} suite suite details
     */
    beforeSuite: function (suite) {
        browser.setTimeout({'implicit': 60000}).catch(function (err) {
            console.log('Error in setting the timeout object (in beforeSuite) : ', {'implicit': 60000}, err);
            return Promise.resolve();
        }).then(function () {
            return browser.setTimeout({'pageLoad': 60000});
        }).catch(function (err) {
            console.log('Error in setting the timeout object (in beforeSuite) : ', {'pageLoad': 60000}, err);
        });
    },
    /**
     * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
     * beforeEach in Mocha)
     */
    beforeHook: function () {
    },
    /**
     * Hook that gets executed _after_ a hook within the suite ends (e.g. runs after calling
     * afterEach in Mocha)
     */
    afterHook: function () {
    },
    /**
     * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
     * @param {Object} test test details
     */
    beforeTest: function (test) {
        browser.setTimeout({'implicit': 60000}).catch(function (err) {
            console.log('Error in setting the timeout object (in beforeTest) : ', {'implicit': 60000}, err);
            return Promise.resolve();
        }).then(function () {
            return browser.setTimeout({'pageLoad': 60000});
        }).catch(function (err) {
            console.log('Error in setting the timeout object (in beforeTest) : ', {'pageLoad': 60000}, err);
        });
    },
    /**
     * Runs before a WebdriverIO command gets executed.
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     */
    beforeCommand: function (commandName, args) {
    },
    /**
     * Runs after a WebdriverIO command gets executed
     * @param {String} commandName hook command name
     * @param {Array} args arguments that command would receive
     * @param {Number} result 0 - command success, 1 - command error
     * @param {Object} error error object if any
     */
    afterCommand: function (commandName, args, result, error) {
    },
    /**
     * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) ends.
     * @param {Object} test test details
     */
    afterTest: function (test) {
    },
    /**
     * Hook that gets executed after the suite has ended
     * @param {Object} suite suite details
     */
    afterSuite: function (suite) {
    },
    /**
     * Gets executed after all tests are done. You still have access to all global variables from
     * the test.
     * @param {Number} result 0 - test pass, 1 - test fail
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    after: function (result, capabilities, specs) {
    },
    /**
     * Gets executed right after terminating the webdriver session.
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {Array.<String>} specs List of spec file paths that ran
     */
    afterSession: function (config, capabilities, specs) {
    },
    /**
     * Gets executed after all workers got shut down and the process is about to exit. An error
     * thrown in the onComplete hook will result in the test run failing.
     * @param {Object} exitCode 0 - success, 1 - fail
     * @param {Object} config wdio configuration object
     * @param {Array.<Object>} capabilities list of capabilities details
     * @param {<Object>} results object containing test results
     */
    onComplete: function (exitCode, config, capabilities, results) {
    },
    /**
     * Gets executed when a refresh happens.
     * @param {String} oldSessionId session ID of the old session
     * @param {String} newSessionId session ID of the new session
     */
    onReload: function (oldSessionId, newSessionId) {
    },
    /**
     * Cucumber specific hooks
     */
    beforeFeature: function (feature) {
    },
    beforeScenario: function (scenario) {
    },
    beforeStep: function (step) {
    },
    afterStep: function (stepResult) {
    },
    afterScenario: function (scenario) {
    },
    afterFeature: function (feature) {
    }
};

if (exeEnv === "local") {
    console.log(commons.appiumAddress);

    // =====================
    // Server Configurations
    // =====================
    // Host address of the running Selenium server. This information is usually obsolete as
    // WebdriverIO automatically connects to localhost. Also if you are using one of the
    // supported cloud services like Sauce Labs, Browserstack or Testing Bot you also don't
    // need to define host and port information because WebdriverIO can figure that out
    // according to your user and key information. However if you are using a private Selenium
    // backend you should define the host address, port, and path here.
    //
    // hostname: 'localhost',
    // port: 4723,
    // path: '/wd/hub',

    // config.hostname = commons.appiumAddress.hostname;
    config.port = commons.appiumAddress.port;
    // config.path = commons.appiumAddress.path;

    //For local execution setting the maxInstances and maxInstancesPerCapability to 1.
    config.maxInstances = maxinstances;
    config.maxInstancesPerCapability = maxinstances;
    config.services = ['appium', 'sauce'];
} else {

    // =================
    // Service Providers
    // =================
    // WebdriverIO supports Sauce Labs, Browserstack and Testing Bot (other cloud providers
    // should work too though). These services define specific user and key (or access key)
    // values you need to put in here in order to connect to these services.
    //

    config.user = commons.sauce.user;
    config.key = commons.sauce.key;

    //
    // ============
    // Capabilities
    // ============
    // Define your capabilities here. WebdriverIO can run multiple capabilities at the same
    // time. Depending on the number of capabilities, WebdriverIO launches several test
    // sessions. Within your capabilities you can overwrite the spec and exclude option in
    // order to group specific specs to a specific capability.
    //
    //
    // First you can define how many instances should be started at the same time. Let's
    // say you have 3 different capabilities (Chrome, Firefox and Safari) and you have
    // set maxInstances to 1, wdio will spawn 3 processes. Therefor if you have 10 spec
    // files and you set maxInstances to 10, all spec files will get tested at the same time
    // and 30 processes will get spawned. The property basically handles how many capabilities
    // from the same test should run tests.
    //
    config.maxInstances = 10;
    //
    // Or set a limit to run tests with a specific capability.
    config.maxInstancesPerCapability = 10;
}

exports.config = config;