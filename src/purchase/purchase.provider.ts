import { PurchaseOrder } from './entities/purchase.entity';
import { DataSource } from 'typeorm';
import { PurchaseOrderLine } from './entities/purchaseLine.entity';

export const purchaseProviders = [
  {
    provide: 'PURCHASE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PurchaseOrder),
    inject: ['DATA_SOURCE'],
  },
];

export const purchaseOrderLine = [
  {
    provide: 'PURCHASE_ORDER_LINE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PurchaseOrderLine),
    inject: ['DATA_SOURCE'],
  },
];
