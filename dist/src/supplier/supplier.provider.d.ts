import { Supplier } from './entities/supplier.entity';
import { DataSource } from 'typeorm';
export declare const supplierProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Supplier>;
    inject: string[];
}[];
