import { DataSource } from 'typeorm';
import { Piutang } from './entities/piutang.entity';

export const piutangProviders = [
  {
    provide: 'PIUTANG_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Piutang),
    inject: ['DATA_SOURCE'],
  },
];
