import { Stock } from './entities/stock.entity';
import { DataSource } from 'typeorm';

export const stockProviders = [
  {
    provide: 'STOCK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Stock),
    inject: ['DATA_SOURCE'],
  },
];
