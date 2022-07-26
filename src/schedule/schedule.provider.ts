import { ScheduleDetail } from './entities/scheduleDetail.entity';
import { Schedule } from './entities/schedule.entity';
import { DataSource } from 'typeorm';

export const scheduleProviders = [
  {
    provide: 'SCHEDULE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Schedule),
    inject: ['DATA_SOURCE'],
  },
  {
    provide: 'SCHEDULE_DETAIL_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ScheduleDetail),
    inject: ['DATA_SOURCE'],
  },
];
