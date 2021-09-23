export default {
    prod: {
        withItems: {
            storeName: 'pizza',
            searchItems: {
                partialItemDescription: 'Dri',
                itemName: 'Drinks',
                specialCharacter: 'Drink@$',
                itemDescription: 'Soft Drinks',
                sku: '12220',
                invalidSearch: 'Invalid search key',
            },
            searchCategories: {
                partialCategory: 'Froz',
            },
            searchResults: {
                item: ['Drinks'],
                category: ['Frozen'],
                noItemsFound: 'No items found.'
            },
            catalogItems: ['Bananas', 'Drinks', 'Ice Cream', 'Juices', 'Lays', 'Macaroni'],
            catalogCategories: ['Favorites', 'Beverages', 'Frozen', 'Snacks']
        },
        searchSalesResult: {
            sale: '#2407 3:07am $54.56',
            saleDetail: 'Sale $54.56 Cash 11/14/2019 03:07 AM',
            saleItemsDetail: ['Subtotal', '$54.56', 'Tax', '$0.00', 'Total', '$54.56', '1', '1', 'Drinks', '$20.00', 'Ice Cream', '$34.56']
        },
       /* withoutItems: {
            itemsTab: ['To add items to your catalog, visit your dashboard.'],
            categoriesTab: ['Favorites 0']
        },*/
        receipts: {
            emailId: '',
            phoneNumber: '866-781-9246'
        },
        storeTax: '10'
    }
};
