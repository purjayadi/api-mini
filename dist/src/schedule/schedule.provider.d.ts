import { ScheduleDetail } from './entities/scheduleDetail.entity';
import { Schedule } from './entities/schedule.entity';
import { DataSource } from 'typeorm';
export declare const scheduleProviders: ({
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Schedule>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<ScheduleDetail>;
    inject: string[];
})[];
