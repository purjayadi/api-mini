"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cashFlowProviders = exports.kasProviders = void 0;
const cashFlow_entity_1 = require("./entities/cashFlow.entity");
const kas_entity_1 = require("./entities/kas.entity");
exports.kasProviders = [
    {
        provide: 'KAS_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(kas_entity_1.Kas),
        inject: ['DATA_SOURCE'],
    },
];
exports.cashFlowProviders = [
    {
        provide: 'CASH_FLOW_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(cashFlow_entity_1.CashFlow),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=accounting.provider.js.map