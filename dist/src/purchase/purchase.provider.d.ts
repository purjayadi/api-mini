import { PurchaseOrder } from './entities/purchase.entity';
import { DataSource } from 'typeorm';
import { PurchaseOrderLine } from './entities/purchaseLine.entity';
export declare const purchaseProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<PurchaseOrder>;
    inject: string[];
}[];
export declare const purchaseOrderLine: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<PurchaseOrderLine>;
    inject: string[];
}[];
