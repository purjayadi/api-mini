import { ReturOrderDetail } from './entities/returOrderDetail.entity';
import { DataSource } from 'typeorm';
import { ReturOrder } from './entities/returOrder.entity';
export declare const returOrderProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<ReturOrder>;
    inject: string[];
}[];
export declare const returOrderDetailProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<ReturOrderDetail>;
    inject: string[];
}[];
