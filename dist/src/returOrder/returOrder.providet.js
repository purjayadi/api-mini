"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returOrderDetailProviders = exports.returOrderProviders = void 0;
const returOrderDetail_entity_1 = require("./entities/returOrderDetail.entity");
const returOrder_entity_1 = require("./entities/returOrder.entity");
exports.returOrderProviders = [
    {
        provide: 'RETUR_ORDER_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(returOrder_entity_1.ReturOrder),
        inject: ['DATA_SOURCE'],
    },
];
exports.returOrderDetailProviders = [
    {
        provide: 'RETUR_ORDER_DETAIL_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(returOrderDetail_entity_1.ReturOrderDetail),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=returOrder.providet.js.map