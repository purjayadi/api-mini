"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resourceProviders = void 0;
const resource_entity_1 = require("../entities/resource.entity");
exports.resourceProviders = [
    {
        provide: 'RESOURCE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(resource_entity_1.Resource),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=resource.provider.js.map