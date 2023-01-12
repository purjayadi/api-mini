import { ReturPurchase } from './entities/returPurchase.entity';
import { DataSource } from 'typeorm';
import { ReturPurchaseDetail } from './entities/returPurchaseDetail.entity';
export declare const returPurchaseProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<ReturPurchase>;
    inject: string[];
}[];
export declare const returPurchaseDetailProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<ReturPurchaseDetail>;
    inject: string[];
}[];
