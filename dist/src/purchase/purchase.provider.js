"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchaseOrderLine = exports.purchaseProviders = void 0;
const purchase_entity_1 = require("./entities/purchase.entity");
const purchaseLine_entity_1 = require("./entities/purchaseLine.entity");
exports.purchaseProviders = [
    {
        provide: 'PURCHASE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(purchase_entity_1.PurchaseOrder),
        inject: ['DATA_SOURCE'],
    },
];
exports.purchaseOrderLine = [
    {
        provide: 'PURCHASE_ORDER_LINE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(purchaseLine_entity_1.PurchaseOrderLine),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=purchase.provider.js.map