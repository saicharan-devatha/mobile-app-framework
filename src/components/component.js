'use strict';

import Promise from "promise";
import log from '../logger';

export default class Component extends Object {
    constructor() {
        super();
        this._timeout = 60000;
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
                        reject("Element not found in page ");
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
                    reject("Element not found in page ");
                });
            }
        });
    }
}