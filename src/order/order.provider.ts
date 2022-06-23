import { OrderDetail } from './order.dto';
import { DataSource } from 'typeorm';
import { Order } from './entities/order.entity';

export const orderProviders = [
  {
    provide: 'ORDER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Order),
    inject: ['DATA_SOURCE'],
  },
];

export const orderDetailProviders = [
  {
    provide: 'ORDER_DETAIL_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(OrderDetail),
    inject: ['DATA_SOURCE'],
  },
];
