'use strict';

let commons = require('../config/commons.js');
const {join} = require('path');

let builder = {

    builder_run: function (type, run, product, env, exeEnv, tunnel) {
        let config_reader = require('../config/groups.js');
        let devices = config_reader.configure[type].devices;
        let pac = commons.proxies[env].proxyUrl;
        return this.device_builder(devices, run, product, env, exeEnv, pac, tunnel);
    },

    device_builder: function (devices, run, product, env, exeEnv, pac, tunnel) {
        let multidevices = [];
        for (let device of devices) {
            let deviceName = device.split("-")[0];
            let platformName = device.split("-")[1];
            let platformVersion = device.split("-")[2];
            let deviceOrientation = device.split("-")[3];
            let caps = this.device_switcher(device, deviceName, platformName, platformVersion, deviceOrientation, run, product, env, exeEnv, pac, tunnel);
            multidevices.push(caps);
        }
        return multidevices;
    },

    device_switcher: function (device, deviceName, platformName, platformVersion, deviceOrientation, run, product, env, exeEnv, pac, tunnel) {
        let tunnelName = tunnel;

        if (env === 'prod') {
            tunnelName = tunnel;
        }
        if ((env !== 'prod') && (exeEnv === "sauce")) {
            tunnelName = tunnel;
        }

        console.log('--> saucelabs tunnel name : ' + tunnel);

        let caps = {};
        let deviceType = "";
        let appFilePath = "";

        if (platformName.toLowerCase().trim().indexOf('android') !== -1) {
            appFilePath = join(process.cwd(), './apps/android/RELEASE_ENDPOINT/release/', commons.appDetails.android.app_name);
        } else if (platformName.toLowerCase().trim().indexOf('ios') !== -1) {
            appFilePath = join(process.cwd(), './apps/ios/', commons.appDetails.ios.app_name);
        }

        console.log(' ---> App File Path :', appFilePath);

        if (platformName.toLowerCase().trim().indexOf('ios') !== -1) {
            deviceType = "ios";
        } else if (platformName.toLowerCase().trim().indexOf('android') !== -1) {
            deviceType = "android";
        }

        switch (deviceType) {
            case 'ios':
                caps = {
                    name: device.replace(/\s/g, '-') + "-" + product,
                    automationName: 'Appium',
                    platformName: platformName,
                    platformVersion: platformVersion,
                    deviceName: deviceName,
                    tunnelIdentifier: tunnelName,
                    build: tunnelName,
                    browserName: "",
                    newCommandTimeout: 120,
                    orientation: deviceOrientation.toUpperCase(),
                    autoWebview: false,
                    eventTimings: false,
                    appiumVersion: "1.13.0", //"1.15.0"
                    extendedDebugging: false,
                    enablePerformanceLogging: false,
                    autoAcceptAlerts: true,
                    autoDismissAlerts: true,
                    showIOSLog: true,
                    skipLogCapture: true,
                    launchTimeout: 60000
                };

                if (exeEnv === 'local') {
                    caps.noReset = false;
                    caps.fullReset = true;
                    caps.app = appFilePath;
                    caps.updatedWDABundleId = "io.appium.WebDriverAgentRunner";
                } else if (exeEnv === 'sauce') {
                    caps.app = "sauce-storage:" + String(commons.appDetails.ios.repo_path).match(/([a-zA-Z_0-9\.]*\.zip$)/)[0];
                }
                return caps;

            case 'android':
                caps = {
                    name: device.replace(/\s/g, '-') + "-" + product,
                    automationName: 'UiAutomator2',
                    platformName: platformName,
                    platformVersion: platformVersion,
                    deviceName: deviceName,
                    tunnelIdentifier: tunnelName,
                    build: tunnelName,
                    browserName: "",
                    newCommandTimeout: 120,
                    orientation: deviceOrientation.toUpperCase(),
                    autoWebview: false,
                    eventTimings: false,
                    appiumVersion: "1.16.0",
                    noReset: false,
                    fullReset: true,
                    extendedDebugging: false,
                    enablePerformanceLogging: false,
                    deviceReadyTimeout: 9000000,
                    androidInstallTimeout: 9000000,
                    autoGrantPermissions: true,
                    //networkSpeed: ['full'],
                    adbExecTimeout: 9000000,
                    skipUnlock: false,
                    //unlockType: ['pin'],
                    unlockKey: '1111',
                    autoLaunch: true,
                    skipLogcatCapture: false,
                    androidNaturalOrientation: false,
                    enforceAppInstall: true,
                    remoteAppsCacheLimit: 0
                };

                if (exeEnv === 'local') {
                    caps.app = appFilePath;
                    caps.androidDeviceReadyTimeout = 9000000;
                    caps.avd = deviceName;
                    caps.avdLaunchTimeout = 9000000;
                    caps.avdReadyTimeout = 9000000;
                } else if (exeEnv === 'sauce') {
                    caps.app = "sauce-storage:" + String(commons.appDetails.android.app_name);
                }
                return caps;
        }
    }
};

module.exports = builder;