"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returPurchaseDetailProviders = exports.returPurchaseProviders = void 0;
const returPurchase_entity_1 = require("./entities/returPurchase.entity");
const returPurchaseDetail_entity_1 = require("./entities/returPurchaseDetail.entity");
exports.returPurchaseProviders = [
    {
        provide: 'RETUR_PURCHASE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(returPurchase_entity_1.ReturPurchase),
        inject: ['DATA_SOURCE'],
    },
];
exports.returPurchaseDetailProviders = [
    {
        provide: 'RETUR_PURCHASE_DETAIL_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(returPurchaseDetail_entity_1.ReturPurchaseDetail),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=returPurchase.provider.js.map