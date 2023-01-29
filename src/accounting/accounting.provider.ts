import { DataSource } from 'typeorm';
import { CashFlow } from './entities/cashFlow.entity';
import { Kas } from './entities/kas.entity';

export const kasProviders = [
  {
    provide: 'KAS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Kas),
    inject: ['DATA_SOURCE'],
  },
];

export const cashFlowProviders = [
  {
    provide: 'CASH_FLOW_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(CashFlow),
    inject: ['DATA_SOURCE'],
  },
];
