"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stockProviders = void 0;
const stock_entity_1 = require("./entities/stock.entity");
exports.stockProviders = [
    {
        provide: 'STOCK_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(stock_entity_1.Stock),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=stock.provider.js.map