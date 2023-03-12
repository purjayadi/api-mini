import { PiutangPayment } from './entities/piutangPayment.entity';
import { DataSource } from 'typeorm';
import { Piutang } from './entities/piutang.entity';

export const piutangProviders = [
  {
    provide: 'PIUTANG_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Piutang),
    inject: ['DATA_SOURCE'],
  },

  {
    provide: 'PIUTANG_PAYMENT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PiutangPayment),
    inject: ['DATA_SOURCE'],
  },
];
