import { Unit } from './entities/unit.entity';
import { DataSource } from 'typeorm';

export const unitProviders = [
  {
    provide: 'UNIT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Unit),
    inject: ['DATA_SOURCE'],
  },
];
