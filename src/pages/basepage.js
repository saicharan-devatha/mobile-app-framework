"use strict";

import Promise from "promise";
import log from "../logger";
import {ACCESS_CONSTS} from "../utils/locators";

export default class BasePage extends Object {
    constructor() {
        super();
        this._timeout = 60000;
        this._hamburgerIcon = () => {
            return this.resolveElement($(ACCESS_CONSTS.DrawerMenu.hamburgerIcon)).catch((err) => {
                return Promise.reject('_hamburgerIcon is not present in the page.');
            });
        }
    }

    async clickHamburgerIcon() {
        try {
            const hamburgerIconEle = await this._hamburgerIcon();
            return hamburgerIconEle.click();
        } catch (err) {
            log.warn("Hamburger Icon failed to click", err);
            return Promise.reject(err);
        }
    }

    //compare 2 arrays
    arraysEqual(_arr1, _arr2) {
        log.warn('Expected: ' + _arr1);
        log.warn('Actual: ' + _arr2);
        if (!Array.isArray(_arr1) ||
            !Array.isArray(_arr2) ||
            _arr1.length !== _arr2.length)
            return false;

        let arr1 = _arr1.concat().sort();
        let arr2 = _arr2.concat().sort();

        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i])
                return false;
        }
        return true;
    }

    /*
     *
     * action: The following actions are supported: accept, dismiss and getButtons. Mandatory parameter
     * buttonLabel: The label text of an existing alert button to click on.
     * This is an optional parameter and is only valid in combination with accept and dismiss actions.
     * eg:- browser.execute_script('mobile: alert', {'action': 'accept', 'buttonLabel': 'Accept'});
     */
    clickAction(_action, _labelName) {
        return browser.execute("mobile:alert", {
            action: _action,
            buttonLabel: _labelName
        }).catch((err) => {
            log.warn('Alert may not be present.', err);
            return Promise.resolve();
        });
    }

    clickAllowCameraPopUp() {
        let _this = this;
        let cameraAccessAllow = undefined;
        return _this._cameraAccessAllow().then((_cameraAccess) => {
            cameraAccessAllow = _cameraAccess;
            return browser.waitUntil(() => {
                console.log("***cameraAccessAllow is displayed***",cameraAccessAllow.isDisplayed());
                return cameraAccessAllow.isDisplayed();
            }, _this.getDefaultTimeout());
        }).then(() => {
            return cameraAccessAllow.click();
        }).catch((err) => {
            log.warn('Error in clicking on Allow button.', err);
            return Promise.reject(err);
        });
    }

    clickAllowLocationPopUp() {
        let _this = this;
        let locationAccessAllow = undefined;
        return _this._locationAccessAllow().then((_locationAccessAllow) => {
            locationAccessAllow = _locationAccessAllow;
            return browser.waitUntil(() => {
                return locationAccessAllow.isDisplayed();
            }, _this.getDefaultTimeout());
        }).then(() => {
            return locationAccessAllow.click();
        }).catch((err) => {
            log.warn('Error in clicking on device location popup.', err);
            return Promise.reject(err);
        });
    }

    clickDenyCameraPopUp() {
        let _this = this;
        let cameraAccessDeny = undefined;
        return _this._cameraAccessDeny().then((_cameraAccess) => {
            cameraAccessDeny = _cameraAccess;
            return browser.waitUntil(() => {
                return cameraAccessDeny.isDisplayed();
            }, _this.getDefaultTimeout());
        }).then(() => {
            return cameraAccessDeny.click();
        }).catch((err) => {
            log.warn('Error in clicking on Deny button.', err);
            return Promise.reject(err);
        });
    }

    getDefaultTimeout() {
        return this._timeout;
    }

    resolveElement(_elementLocator, timeout = this.getDefaultTimeout()) {
        return new Promise((resolve, reject) => {
            let element = undefined;
            if (Array.isArray(_elementLocator)) {
                element = _elementLocator[0];
                if (element !== undefined && element.isExisting()) {
                    resolve(_elementLocator);
                } else {
                    browser.waitUntil(() => {
                        return _elementLocator.isExisting();
                    }, timeout).then(() => {
                        resolve(_elementLocator);
                    }).catch(err => {
                        log.warn("Element not found in page. ", err);
                        reject(err);
                    });
                }
            } else {
                _elementLocator.then((elementLocator) => {
                    if (Array.isArray(elementLocator)) {
                        element = elementLocator[0];
                        if (element !== undefined && element.isExisting()) {
                            resolve(_elementLocator);
                        } else {
                            return Promise.reject('Element not found in page.');
                        }
                    } else {
                        return browser.waitUntil(() => {
                            return elementLocator.isExisting();
                        }, timeout);
                    }
                }).then(() => {
                    resolve(_elementLocator);
                }).catch(err => {
                    log.warn("Element not found in page. ", err);
                    reject("err");
                });
            }
        });
    }
}