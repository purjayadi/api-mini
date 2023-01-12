"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissionProviders = void 0;
const permission_entity_1 = require("../entities/permission.entity");
exports.permissionProviders = [
    {
        provide: 'PERMISSION_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(permission_entity_1.Permission),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=permission.provider.js.map