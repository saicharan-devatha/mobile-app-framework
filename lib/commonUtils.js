'use strict';

let CryptoJS = require('crypto-js');
let keySize = 256;
let iterations = 100;
let commons = require('../config/commons');
let dateFormat = require('dateformat');

let commonUtils = {

    getTodayDateStr: function (format) {
        let now = new Date();
        return dateFormat(now, format);
    },

    getDateStr: function (dt, format) {
        return dateFormat(dt, format);
    },

    encrypt: function (msg) {
        let pass = commons.secretKey;
        let salt = CryptoJS.lib.WordArray.random(128 / 8);
        let key = CryptoJS.PBKDF2(pass, salt, {
            keySize: keySize / 32,
            iterations: iterations
        });

        let iv = CryptoJS.lib.WordArray.random(128 / 8);

        let encrypted = CryptoJS.AES.encrypt(msg, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC

        });

        // salt, iv will be hex 32 in length
        // append them to the ciphertext for use  in decryption
        let transitmessage = salt.toString() + iv.toString() + encrypted.toString();
        return transitmessage;
    },

    decrypt: function (transitmessage) {
        let pass = commons.secretKey;
        let salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
        let iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32))
        let encrypted = transitmessage.substring(64);

        let key = CryptoJS.PBKDF2(pass, salt, {
            keySize: keySize / 32,
            iterations: iterations
        });

        let decrypted = CryptoJS.AES.decrypt(encrypted, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC

        });
        return decrypted.toString(CryptoJS.enc.Utf8);
    },

    getSpecName: function (testName, deviceName, platformVersion, env, specFile) {
        return testName + "|" + deviceName + "|" + platformVersion + "|" + env + "|" + specFile;
    }
};

module.exports = commonUtils;