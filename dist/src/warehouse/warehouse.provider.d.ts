import { Warehouse } from './entities/warehouse.entity';
import { DataSource } from 'typeorm';
export declare const warehouseProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Warehouse>;
    inject: string[];
}[];
