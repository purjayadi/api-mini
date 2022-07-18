import { PiutangPayment } from './entities/piutangPayment.entity';
import { DataSource } from 'typeorm';
import { Piutang } from './entities/piutang.entity';
import { PiutangPaymentDetail } from './entities/piutangPaymentDetail.entity';

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

  {
    provide: 'PIUTANG_PAYMENT_DETAIL_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PiutangPaymentDetail),
    inject: ['DATA_SOURCE'],
  },
];
