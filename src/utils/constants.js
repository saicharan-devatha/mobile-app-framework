'use strict';

let locators = undefined;
if (browser.capabilities.platformName.trim().toLowerCase() !== 'ios') {
    locators = require('./android/constants');
} else {
    locators = require('./ios/constants');
}
exports.TEXT_CONSTS = locators.TEXT_CONSTS;