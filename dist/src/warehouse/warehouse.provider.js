"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.warehouseProviders = void 0;
const warehouse_entity_1 = require("./entities/warehouse.entity");
exports.warehouseProviders = [
    {
        provide: 'WAREHOUSE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(warehouse_entity_1.Warehouse),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=warehouse.provider.js.map