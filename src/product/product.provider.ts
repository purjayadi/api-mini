import { Product } from './entities/product.entity';
import { DataSource } from 'typeorm';
import { Price } from './entities/price.entity';

export const productProviders = [
  {
    provide: 'PRODUCT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Product),
    inject: ['DATA_SOURCE'],
  },
];

export const productPriceProviders = [
  {
    provide: 'PRODUCT_PRICE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Price),
    inject: ['DATA_SOURCE'],
  },
];
