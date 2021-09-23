'use strict';

import Promise from 'promise';
import log from '../../logger';
import {ACCESS_CONSTS} from "../../utils/locators";
import BasePage from "../basepage";

export default class Variance extends BasePage {
    constructor() {
        super();
        this._closeIcon = () => {
            return this.resolveElement($(ACCESS_CONSTS.optionsScreen.backButton)).catch((err) => {
                return Promise.reject('_closeIcon is not present in the page.');
            });
        };
        this._addItemToCart = () => {
            return this.resolveElement($(ACCESS_CONSTS.optionsScreen.addButton)).catch((err) => {
                return Promise.reject('_addItemToCart is not present in the page.');
            });
        };
        this._itemPriceHeader = () => {
            return this.resolveElement($(ACCESS_CONSTS.optionsScreen.priceHeader)).catch((err) => {
                return Promise.reject('_itemPriceHeader is not present in the page.');
            });
        };
        this._varianceRadioButtons = () => {
            return this.resolveElement($$(ACCESS_CONSTS.optionsScreen.varianceOptions)).catch((err) => {
                return Promise.reject('_varianceRadioButtons is not present in the page.');
            });
        };
    }

    clickCloseIcon() {
        let _this = this;
        let closeIcon = undefined;
        return _this._closeIcon().then((_closeIcon) => {
            closeIcon = _closeIcon;
            return browser.waitUntil(() => {
                return closeIcon.isDisplayed();
            }, _this.getDefaultTimeout());
        }).then(() => {
            return closeIcon.click();
        }).catch((err) => {
            log.warn('Error while clicking close (x) icon on options screen.', err);
            return Promise.reject(err);
        });
    }

    clickAddItemToCart() {
        let _this = this;
        let addItemToCart = undefined;
        return _this._addItemToCart().then((_addItemToCart) => {
            addItemToCart = _addItemToCart;
            return browser.waitUntil(() => {
                return addItemToCart.isDisplayed();
            }, _this.getDefaultTimeout());
        }).then(() => {
            return addItemToCart.click();
        }).catch((err) => {
            log.warn('Error while clicking on add button from options screen.', err);
            return Promise.reject(err);
        });
    }

    getItemPriceHeader() {
        let _this = this;
        let itemPriceHeader = undefined;
        return _this._itemPriceHeader().then((_itemPriceHeader) => {
            itemPriceHeader = _itemPriceHeader;
            return browser.waitUntil(() => {
                return itemPriceHeader.isDisplayed();
            }, _this.getDefaultTimeout());
        }).then(() => {
            return itemPriceHeader.getText();
        }).catch((err) => {
            log.warn('Error while retrieving the price from header.', err);
            return Promise.reject(err);
        });
    }

    getVariances() {
        let _this = this;
        return _this._varianceRadioButtons().then((_varianceRadioButton) => {
            let varianceRadioButtons = _varianceRadioButton.map((variance) => {
                return variance.getAttribute('label');
            });
            return Promise.all(varianceRadioButtons);
        }).catch((err) => {
            log.warn('Error in retrieving the options from options screen.', err);
            return Promise.reject(err);
        });
    }

    async clickVariance(variance) {
        try {
            const varianceRadioButtons = await this._varianceRadioButtons();
            let _option = undefined;

            for (let i = 0; i < varianceRadioButtons.length; i++) {
                let option = await varianceRadioButtons[i].getAttribute(ACCESS_CONSTS.optionsScreen.varianceOptionAttribute);

                if (option.trim().toLowerCase() === variance.trim().toLowerCase()) {
                    _option = varianceRadioButtons[i];
                    break;
                }
            }
            return _option.click();
        } catch (err) {
            log.warn('Error in selecting' + variance + ' from options/variance screen.', err);
            return Promise.reject(err);
        }
    }
}