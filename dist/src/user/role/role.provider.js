"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleProviders = void 0;
const role_entity_1 = require("../entities/role.entity");
exports.roleProviders = [
    {
        provide: 'ROLE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(role_entity_1.Role),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=role.provider.js.map