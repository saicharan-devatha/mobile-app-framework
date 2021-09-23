'use strict';

import Promise from 'promise';
import log from '../../logger';
import {ACCESS_CONSTS} from "../../utils/locators";
import BasePage from "../basepage";

const createPromise = Symbol('createPromise');

export default class NumberPad extends BasePage {
    constructor() {
        super();
        this._keypadButton_1 = () => {
            return this.resolveElement($(ACCESS_CONSTS.numberPad.one)).catch((err) => {
                return Promise.reject('_keypadButton_1 is not present in the page.');
            });
        };
        this._keypadButton_2 = () => {
            return this.resolveElement($(ACCESS_CONSTS.numberPad.two)).catch((err) => {
                return Promise.reject('_keypadButton_2 is not present in the page.');
            });
        };
        this._keypadButton_3 = () => {
            return this.resolveElement($(ACCESS_CONSTS.numberPad.three)).catch((err) => {
                return Promise.reject('_keypadButton_3 is not present in the page.');
            });
        };
        this._keypadButton_4 = () => {
            return this.resolveElement($(ACCESS_CONSTS.numberPad.four)).catch((err) => {
                return Promise.reject('_keypadButton_4 is not present in the page.');
            });
        };
        this._keypadButton_5 = () => {
            return this.resolveElement($(ACCESS_CONSTS.numberPad.five)).catch((err) => {
                return Promise.reject('_keypadButton_5 is not present in the page.');
            });
        };
        this._keypadButton_6 = () => {
            return this.resolveElement($(ACCESS_CONSTS.numberPad.six)).catch((err) => {
                return Promise.reject('_keypadButton_6 is not present in the page.');
            });
        };
        this._keypadButton_7 = () => {
            return this.resolveElement($(ACCESS_CONSTS.numberPad.seven)).catch((err) => {
                return Promise.reject('_keypadButton_7 is not present in the page.');
            });
        };
        this._keypadButton_8 = () => {
            return this.resolveElement($(ACCESS_CONSTS.numberPad.eight)).catch((err) => {
                return Promise.reject('_keypadButton_8 is not present in the page.');
            });
        };
        this._keypadButton_9 = () => {
            return this.resolveElement($(ACCESS_CONSTS.numberPad.nine)).catch((err) => {
                return Promise.reject('_keypadButton_9 is not present in the page.');
            });
        };
        this._keypadButton_C = () => {
            return this.resolveElement($(ACCESS_CONSTS.numberPad.cButton)).catch((err) => {
                return Promise.reject('_keypadButton_C is not present in the page.');
            });
        };
        this._keypadButton_0 = () => {
            return this.resolveElement($(ACCESS_CONSTS.numberPad.zero)).catch((err) => {
                return Promise.reject('_keypadButton_0 is not present in the page.');
            });
        };
        this._keypadButton_Add = () => {
            return this.resolveElement($(ACCESS_CONSTS.numberPad.addButton)).catch((err) => {
                return Promise.reject('_keypadButton_Add is not present in the page.');
            });
        };
    }

    clickKeypadButton_1() {
        let _this = this;
        let keypadButton_1 = undefined;
        return _this._keypadButton_1().then((_keypadButton_1) => {
            keypadButton_1 = _keypadButton_1;
            return browser.waitUntil(() => {
                return keypadButton_1.isDisplayed();
            }, _this.getDefaultTimeout());
        }).then(() => {
            return keypadButton_1.click();
        }).catch((err) => {
            log.warn('Error in clicking on number 1 button from number keypad.', err);
            return Promise.reject(err);
        });
    }

    clickKeypadButton_2() {
        let _this = this;
        let keypadButton_2 = undefined;
        return _this._keypadButton_2().then((_keypadButton_2) => {
            keypadButton_2 = _keypadButton_2;
            return browser.waitUntil(() => {
                return keypadButton_2.isDisplayed();
            }, _this.getDefaultTimeout());
        }).then(() => {
            return keypadButton_2.click();
        }).catch((err) => {
            log.warn('Error in clicking on number 2 button from number keypad.', err);
            return Promise.reject(err);
        });
    }

    clickKeypadButton_3() {
        let _this = this;
        let keypadButton_3 = undefined;
        return _this._keypadButton_3().then((_keypadButton_3) => {
            keypadButton_3 = _keypadButton_3;
            return browser.waitUntil(() => {
                return keypadButton_3.isDisplayed();
            }, _this.getDefaultTimeout());
        }).then(() => {
            return keypadButton_3.click();
        }).catch((err) => {
            log.warn('Error in clicking on number 3 from number keypad.', err);
            return Promise.reject(err);
        });
    }

    clickKeypadButton_4() {
        let _this = this;
        let keypadButton_4 = undefined;
        return _this._keypadButton_4().then((_keypadButton_4) => {
            keypadButton_4 = _keypadButton_4;
            return browser.waitUntil(() => {
                return keypadButton_4.isDisplayed();
            }, _this.getDefaultTimeout());
        }).then(() => {
            return keypadButton_4.click();
        }).catch((err) => {
            log.warn('Error in clicking on number 4 from number keypad.', err);
            return Promise.reject(err);
        });
    }

    clickKeypadButton_5() {
        let _this = this;
        let keypadButton_5 = undefined;
        return _this._keypadButton_5().then((_keypadButton_5) => {
            keypadButton_5 = _keypadButton_5;
            return browser.waitUntil(() => {
                return keypadButton_5.isDisplayed();
            }, _this.getDefaultTimeout());
        }).then(() => {
            return keypadButton_5.click();
        }).catch((err) => {
            log.warn('Error in clicking on number 5 from number keypad.', err);
            return Promise.reject(err);
        });
    }

    clickKeypadButton_6() {
        let _this = this;
        let keypadButton_6 = undefined;
        return _this._keypadButton_6().then((_keypadButton_6) => {
            keypadButton_6 = _keypadButton_6;
            return browser.waitUntil(() => {
                return keypadButton_6.isDisplayed();
            }, _this.getDefaultTimeout());
        }).then(() => {
            return keypadButton_6.click();
        }).catch((err) => {
            log.warn('Error in clicking on number 6 from number keypad.', err);
            return Promise.reject(err);
        });
    }

    clickKeypadButton_7() {
        let _this = this;
        let keypadButton_7 = undefined;
        return _this._keypadButton_7().then((_keypadButton_7) => {
            keypadButton_7 = _keypadButton_7;
            return browser.waitUntil(() => {
                return keypadButton_7.isDisplayed();
            }, _this.getDefaultTimeout());
        }).then(() => {
            return keypadButton_7.click();
        }).catch((err) => {
            log.warn('Error in clicking on number 7 from number keypad.', err);
            return Promise.reject(err);
        });
    }

    clickKeypadButton_8() {
        let _this = this;
        let keypadButton_8 = undefined;
        return _this._keypadButton_8().then((_keypadButton_8) => {
            keypadButton_8 = _keypadButton_8;
            return browser.waitUntil(() => {
                return keypadButton_8.isDisplayed();
            }, _this.getDefaultTimeout());
        }).then(() => {
            return keypadButton_8.click();
        }).catch((err) => {
            log.warn('Error in clicking on number 8 from number keypad.', err);
            return Promise.reject(err);
        });
    }

    clickKeypadButton_9() {
        let _this = this;
        let keypadButton_9 = undefined;
        return _this._keypadButton_9().then((_keypadButton_9) => {
            keypadButton_9 = _keypadButton_9;
            return browser.waitUntil(() => {
                return keypadButton_9.isDisplayed();
            }, _this.getDefaultTimeout());
        }).then(() => {
            return keypadButton_9.click();
        }).catch((err) => {
            log.warn('Error in clicking on number 9 from number keypad.', err);
            return Promise.reject(err);
        });
    }

    clickKeypadButton_C() {
        let _this = this;
        let keypadButton_C = undefined;
        return _this._keypadButton_C().then((_keypadButton_C) => {
            keypadButton_C = _keypadButton_C;
            return browser.waitUntil(() => {
                return keypadButton_C.isDisplayed();
            }, _this.getDefaultTimeout());
        }).then(() => {
            return keypadButton_C.click();
        }).catch((err) => {
            log.warn('Error in clicking on C from number keypad.', err);
            return Promise.reject(err);
        });
    }

    clickKeypadButton_0() {
        let _this = this;
        let keypadButton_0 = undefined;
        return _this._keypadButton_0().then((_keypadButton_0) => {
            keypadButton_0 = _keypadButton_0;
            return browser.waitUntil(() => {
                return keypadButton_0.isDisplayed();
            }, _this.getDefaultTimeout());
        }).then(() => {
            return keypadButton_0.click();
        }).catch((err) => {
            log.warn('Error in clicking on number 0 from number keypad.', err);
            return Promise.reject(err);
        });
    }

    clickKeypadButton_Add() {
        let _this = this;
        let keypadButton_Add = undefined;
        return _this._keypadButton_Add().then((_keypadButton_Add) => {
            keypadButton_Add = _keypadButton_Add;
            return browser.waitUntil(() => {
                return keypadButton_Add.isDisplayed();
            }, _this.getDefaultTimeout());
        }).then(() => {
            return keypadButton_Add.click();
        }).catch((err) => {
            log.warn('Error in clicking on add button from number pad.', err);
            return Promise.reject(err);
        });
    }

    [createPromise](func) {
        return () => new Promise((resolve, reject) => {
            func().then(() => {
                resolve();
            }).catch((err) => {
                reject(err);
            });
        });
    }

    enterValue(totalPrice) {  //9765 = 97.65 in UI
        try {
            let promises = [];
            totalPrice.split('').forEach((c) => {
                switch (c) {
                    case '1' :
                        promises.push(this[createPromise](this.clickKeypadButton_1.bind(this)));
                        break;
                    case '2':
                        promises.push(this[createPromise](this.clickKeypadButton_2.bind(this)));
                        break;
                    case '3':
                        promises.push(this[createPromise](this.clickKeypadButton_3.bind(this)));
                        break;
                    case '4':
                        promises.push(this[createPromise](this.clickKeypadButton_4.bind(this)));
                        break;
                    case '5':
                        promises.push(this[createPromise](this.clickKeypadButton_5.bind(this)));
                        break;
                    case '6':
                        promises.push(this[createPromise](this.clickKeypadButton_6.bind(this)));
                        break;
                    case '7':
                        promises.push(this[createPromise](this.clickKeypadButton_7.bind(this)));
                        break;
                    case '8':
                        promises.push(this[createPromise](this.clickKeypadButton_8.bind(this)));
                        break;
                    case '9':
                        promises.push(this[createPromise](this.clickKeypadButton_9.bind(this)));
                        break;
                    case '0':
                        promises.push(this[createPromise](this.clickKeypadButton_0.bind(this)));
                        break;
                }
            });

            return new Promise((resolve, reject) => {
                (async function () {
                    try {
                        for (let i = 0; i < promises.length; i++) {
                            await promises[i]();

                            if (i + 1 === promises.length) {
                                return resolve();
                            }
                        }
                    } catch (e) {
                        log.warn(e);
                        reject(e);
                    }
                })();
            });
        } catch (err) {
            log.warn('Error while entering value from number pad.', err);
            return Promise.reject(err);
        }
    }
}