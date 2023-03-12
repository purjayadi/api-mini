import { OrderDetail } from './entities/orderDetail.entity';
import { DataSource } from 'typeorm';
import { Order } from './entities/order.entity';
export declare const orderProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Order>;
    inject: string[];
}[];
export declare const orderDetailProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<OrderDetail>;
    inject: string[];
}[];
