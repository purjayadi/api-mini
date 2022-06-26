import { ReturPurchase } from './entities/returPurchase.entity';
import { DataSource } from 'typeorm';
import { ReturPurchaseDetail } from './entities/returPurchaseDetail.entity';

export const returPurchaseProviders = [
  {
    provide: 'RETUR_PURCHASE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ReturPurchase),
    inject: ['DATA_SOURCE'],
  },
];

export const returPurchaseDetailProviders = [
  {
    provide: 'RETUR_PURCHASE_DETAIL_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(ReturPurchaseDetail),
    inject: ['DATA_SOURCE'],
  },
];
