"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unitProviders = void 0;
const unit_entity_1 = require("./entities/unit.entity");
exports.unitProviders = [
    {
        provide: 'UNIT_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(unit_entity_1.Unit),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=unit.provider.js.map