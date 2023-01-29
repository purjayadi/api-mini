import { Warehouse } from './entities/warehouse.entity';
import { DataSource } from 'typeorm';

export const warehouseProviders = [
  {
    provide: 'WAREHOUSE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Warehouse),
    inject: ['DATA_SOURCE'],
  },
];
