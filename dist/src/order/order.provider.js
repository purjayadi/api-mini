"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderDetailProviders = exports.orderProviders = void 0;
const orderDetail_entity_1 = require("./entities/orderDetail.entity");
const order_entity_1 = require("./entities/order.entity");
exports.orderProviders = [
    {
        provide: 'ORDER_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(order_entity_1.Order),
        inject: ['DATA_SOURCE'],
    },
];
exports.orderDetailProviders = [
    {
        provide: 'ORDER_DETAIL_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(orderDetail_entity_1.OrderDetail),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=order.provider.js.map