"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productPriceProviders = exports.productProviders = void 0;
const product_entity_1 = require("./entities/product.entity");
const price_entity_1 = require("./entities/price.entity");
exports.productProviders = [
    {
        provide: 'PRODUCT_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(product_entity_1.Product),
        inject: ['DATA_SOURCE'],
    },
];
exports.productPriceProviders = [
    {
        provide: 'PRODUCT_PRICE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(price_entity_1.Price),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=product.provider.js.map