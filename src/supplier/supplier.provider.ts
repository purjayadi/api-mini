import { Supplier } from './entities/supplier.entity';
import { DataSource } from 'typeorm';

export const supplierProviders = [
  {
    provide: 'SUPPLIER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Supplier),
    inject: ['DATA_SOURCE'],
  },
];
