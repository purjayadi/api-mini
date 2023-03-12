"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.piutangProviders = void 0;
const piutangPayment_entity_1 = require("./entities/piutangPayment.entity");
const piutang_entity_1 = require("./entities/piutang.entity");
exports.piutangProviders = [
    {
        provide: 'PIUTANG_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(piutang_entity_1.Piutang),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'PIUTANG_PAYMENT_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(piutangPayment_entity_1.PiutangPayment),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=piutang.provider.js.map