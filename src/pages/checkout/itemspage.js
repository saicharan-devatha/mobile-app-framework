'use strict';

import Promise from 'promise';
import log from "../../logger";
import {ACCESS_CONSTS} from "../../utils/locators";
import BasePage from "./../basepage";

export default class ItemsPage extends BasePage {
    constructor() {
        super();
        this._categories = () => {
            return this.resolveElement($$(ACCESS_CONSTS.itemsPage.categories)).catch((err) => {
                return Promise.reject('_categoryItems is not present in the page.');
            });
        };
        this._categoryCards = () => {
            return this.resolveElement($$(ACCESS_CONSTS.itemsPage.categoryCards)).catch((err) => {
                return Promise.reject('_item_card is not present in the page.');
            });
        };
    }

    getCategories() {
        let _this = this;
        return _this._categories().then((_categories) => {
            let categories = _categories.map((category) => {
                return category.getAttribute(ACCESS_CONSTS.itemsPage.categoriesScrollBarAttribute);
            });
            return Promise.all(categories);
        }).catch((err) => {
            log.warn('Error in retrieving the item contents from items bar. ', err);
            return Promise.reject(err);
        });
    }

    async clickCategories(_category) {
        try {
            const categories = await this._categories();
            const itemCategories = await this.getCategories();
            const categoryIndex = itemCategories.findIndex(element => element.includes(_category));
            if (categoryIndex !== -1) {
                return categories[categoryIndex].click();
            } else {
                return Promise.reject('_category does not match the item cards');
            }
        } catch (err) {
            log.warn('Error in clicking on category under items from checkout screen', err);
            return Promise.reject(err);
        }
    }

    getCategoryCards() {
        let _this = this;
        return _this._categoryCards().then((_categoryCards) => {
            let categoryCards = _categoryCards.map((categoryCard) => {
                return categoryCard.getText();
            });
            return Promise.all(categoryCards);
        }).catch((err) => {
            log.warn('Error in retrieving the item cards from category items.', err);
            return Promise.reject(err);
        });
    }

    async clickCategoryCards(_categoryCard) {
        try {
            const cards = await this._categoryCards();
            const categoryCards = await this.getCategoryCards();
            const cardIndex = categoryCards.findIndex(element => element.includes(_categoryCard));
            if (cardIndex !== -1) {
                return cards[cardIndex].click();
            } else {
                return Promise.reject('_categoryCard does not match the item cards');
            }
        } catch (err) {
            log.warn('Error in clicking on category cards under categories from checkout screen.', err);
            return Promise.reject(err);
        }
    }
}
