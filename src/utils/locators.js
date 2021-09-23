'use strict';

let locators = undefined;
if (browser.capabilities.platformName.trim().toLowerCase() !== 'ios') {
    locators = require('./android/locators');
} else {
    locators = require('./ios/locators');
}
exports.ACCESS_CONSTS = locators.ACCESS_CONSTS;