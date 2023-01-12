"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supplierProviders = void 0;
const supplier_entity_1 = require("./entities/supplier.entity");
exports.supplierProviders = [
    {
        provide: 'SUPPLIER_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(supplier_entity_1.Supplier),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=supplier.provider.js.map