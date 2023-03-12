"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerProviders = void 0;
const customer_entity_1 = require("./entities/customer.entity");
exports.customerProviders = [
    {
        provide: 'CUSTOMER_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(customer_entity_1.Customer),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=customer.provider.js.map