"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleProviders = void 0;
const scheduleDetail_entity_1 = require("./entities/scheduleDetail.entity");
const schedule_entity_1 = require("./entities/schedule.entity");
exports.scheduleProviders = [
    {
        provide: 'SCHEDULE_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(schedule_entity_1.Schedule),
        inject: ['DATA_SOURCE'],
    },
    {
        provide: 'SCHEDULE_DETAIL_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(scheduleDetail_entity_1.ScheduleDetail),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=schedule.provider.js.map