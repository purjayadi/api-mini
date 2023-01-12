"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rolePermissionProviders = void 0;
const rolePermission_entity_1 = require("./../entities/rolePermission.entity");
exports.rolePermissionProviders = [
    {
        provide: 'ROLE_PERMISSION_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(rolePermission_entity_1.RolePermission),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=rolePermission.provider.js.map