'use strict';

import Promise from 'promise';
import BasePage from './../basepage';
import log from '../../logger';
import {ACCESS_CONSTS} from "../../utils/locators";

export default class KeypadPage extends BasePage {
    constructor() {
        super();
        this._keypadTabAddItemName = () => {
            return this.resolveElement($(ACCESS_CONSTS.keypadPage.addItemName)).catch((err) => {
                return Promise.reject('_keypadTabAddItemName is not present in the checkout keypad tab screen.');
            });
        };
        this._keypadTabChargeButton = () => {
            return this.resolveElement($(ACCESS_CONSTS.keypadPage.chargeButton)).catch((err) => {
                return Promise.reject('_keypadTabChargeButton is not present in the checkout landing page.',);
            });
        };
    }

    enterKeypadTabAddItemName(addItemName) {
        let _this = this;
        let keypadTabAddItemName = undefined;
        return _this._keypadTabAddItemName().then((_keypadTabAddItemName) => {
            keypadTabAddItemName = _keypadTabAddItemName;
            return browser.waitUntil(() => {
                return keypadTabAddItemName.isDisplayed();
            }, _this.getDefaultTimeout());
        }).then(() => {
            return keypadTabAddItemName.setValue(addItemName);
        }).catch((err) => {
            log.warn('Error in entering item name from checkout keypad screen.', err);
            return Promise.reject(err);
        });
    }

    clickKeypadTabChargeButton() {
        let _this = this;
        let keypadTabChargeButton = undefined;
        return _this._keypadTabChargeButton().then((_keypadTabChargeButton) => {
            keypadTabChargeButton = _keypadTabChargeButton;
            return browser.waitUntil(() => {
                return keypadTabChargeButton.isDisplayed();
            }, _this.getDefaultTimeout());
        }).then(() => {
            return keypadTabChargeButton.click();
        }).catch((err) => {
            log.warn('Error in clicking on keypad charge button from checkout screen landing page.', err);
            return Promise.reject(err);
        });
    }
}