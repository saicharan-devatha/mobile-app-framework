'use strict';

import Promise from 'promise';
import log from '../../logger';
import BasePage from './../basepage';
import {ACCESS_CONSTS} from "../../utils/locators";

export default class PaymentPage extends BasePage {
    constructor() {
        super();
        this._backButton = () => {
            return this.resolveElement($$(ACCESS_CONSTS.paymentPage.paymentBackButton)).catch((err) => {
                return Promise.reject('_backButton is not present in the page.');
            });
        };
        this._cashPaymentCheckout = () => {
            return this.resolveElement($(ACCESS_CONSTS.paymentPage.cash)).catch((err) => {
                return Promise.reject('_cashPaymentCheckout is not present in the page.');
            });
        };
        this._cashTenderBackButton = () => {
            return this.resolveElement($(ACCESS_CONSTS.paymentPage.cashBackButton)).catch((err) => {
                return Promise.reject('_cashTenderBackButton is not present in the page.');
            });
        };
        this._cashEnteredPriceText = () => {
            return this.resolveElement($(ACCESS_CONSTS.paymentPage.enteredPriceText)).catch((err) => {
                return Promise.reject('_cashKeypadPriceText is not present in the page.');
            });
        };
        this._cashTenderEnterButton = () => {
            return this.resolveElement($(ACCESS_CONSTS.paymentPage.tenderEnterButton)).catch((err) => {
                return Promise.reject('_cashTenderEnterButton is not present in the page.');
            });
        };
        this._totalValue = () => {
            return this.resolveElement($$(ACCESS_CONSTS.paymentPage.totalValue)).catch((err) => {
                return Promise.reject('_totalValue is nor present in the page.');
            });
        };
    }

    clickBackButton() {
        let _this = this;
        let backButton = undefined;
        return _this._backButton().then((_backButton) => {
            backButton = _backButton;
            return browser.waitUntil(() => {
                return backButton[1].isDisplayed();
            }, _this.getDefaultTimeout());
        }).then(() => {
            return backButton[1].click();
        }).catch((err) => {
            log.warn('Error in clicking back button from payment selection page.', err);
            return Promise.reject(err);
        });
    }

    clickCashPaymentCheckout() {
        let _this = this;
        let cashPaymentCheckout = undefined;
        return _this._cashPaymentCheckout().then((_cashPaymentCheckout) => {
            cashPaymentCheckout = _cashPaymentCheckout;
            return browser.waitUntil(() => {
                return cashPaymentCheckout.isDisplayed();
            }, _this.getDefaultTimeout());
        }).then(() => {
            return cashPaymentCheckout.click();
        }).catch((err) => {
            log.warn('Error in clicking on cash payment checkout button from payment selection page.', err);
            return Promise.reject(err);
        });
    }

    clickCashTenderBackButton() {
        let _this = this;
        let cashTenderBackButton = undefined;
        return _this._cashTenderBackButton().then((_cashTenderBackButton) => {
            cashTenderBackButton = _cashTenderBackButton;
            return browser.waitUntil(() => {
                return cashTenderBackButton.isDisplayed();
            }, _this.getDefaultTimeout());
        }).then(() => {
            return cashTenderBackButton.click();
        }).catch((err) => {
            log.warn('Error in clicking on back button from tender amount page.', err);
            return Promise.reject(err);
        });
    }

    clickCashEnteredPriceText() {
        let _this = this;
        let cashEnteredPriceText = undefined;
        return _this._cashEnteredPriceText().then((_cashEnteredPriceText) => {
            cashEnteredPriceText = _cashEnteredPriceText;
            return browser.waitUntil(() => {
                return cashEnteredPriceText.isDisplayed();
            }, _this.getDefaultTimeout());
        }).then(() => {
            return cashEnteredPriceText.click();
        }).catch((err) => {
            log.warn('Error in clicking on keypad price text from tender amount page.', err);
            return Promise.reject(err);
        });
    }

    clickCashTenderEnterButton() {
        let _this = this;
        let cashTenderEnterButton = undefined;
        return _this._cashTenderEnterButton().then((_cashTenderEnterButton) => {
            cashTenderEnterButton = _cashTenderEnterButton;
            return browser.waitUntil(() => {
                return cashTenderEnterButton.isDisplayed();
            }, _this.getDefaultTimeout());
        }).then(() => {
            return cashTenderEnterButton.click();
        }).catch((err) => {
            log.warn('Error in clicking on enter button from tender amount page.', err);
            return Promise.reject(err);
        });
    }

    getTenderStatus() {
        let _this = this;
        let cashTenderEnterButton = undefined;
        return _this._cashTenderEnterButton().then((_cashTenderEnterButton) => {
            cashTenderEnterButton = _cashTenderEnterButton;
            return browser.waitUntil(() => {
                return cashTenderEnterButton.isDisplayed();
            }, _this.getDefaultTimeout());
        }).then(() => {
            return cashTenderEnterButton.getAttribute(ACCESS_CONSTS.paymentPage.tenderStatusAttribute);
        }).catch((err) => {
            log.warn('Error while retrieving status of tender button from enter tender amount page.', err);
            return Promise.reject(err);
        });
    }

    getTotalValue() {
        let _this = this;
        let totalValue = undefined;
        return _this._totalValue().then((_totalValue) => {
            totalValue = _totalValue;
            return browser.waitUntil(() => {
                return totalValue[1].isDisplayed();
            }, _this.getDefaultTimeout());
        }).then(() => {
            return totalValue[1].getAttribute(ACCESS_CONSTS.paymentPage.totalValueAttribute);
        }).catch((err) => {
            log.warn('Error while retrieving total value from select payment screen.', err);
            return Promise.reject(err);
        });
    }
}