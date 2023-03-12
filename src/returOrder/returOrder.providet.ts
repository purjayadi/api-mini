import { ReturOrderDetail } from './entities/returOrderDetail.entity';
import { DataSource } from 'typeorm';
import { ReturOrder } from './entities/returOrder.entity';

export const returOrderProviders = [
  {
    provide: 'RETUR_ORDER_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ReturOrder),
    inject: ['DATA_SOURCE'],
  },
];

export const returOrderDetailProviders = [
  {
    provide: 'RETUR_ORDER_DETAIL_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ReturOrderDetail),
    inject: ['DATA_SOURCE'],
  },
];
