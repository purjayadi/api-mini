"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supplierBankProviders = void 0;
const supplierBankAccount_entity_1 = require("./entities/supplierBankAccount.entity");
exports.supplierBankProviders = [
    {
        provide: 'SUPPLIER_BANK_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(supplierBankAccount_entity_1.SupplierBankAccount),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=supplierBank.provider.js.map