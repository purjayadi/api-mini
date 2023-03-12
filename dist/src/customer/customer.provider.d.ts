import { Customer } from './entities/customer.entity';
import { DataSource } from 'typeorm';
export declare const customerProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Customer>;
    inject: string[];
}[];
