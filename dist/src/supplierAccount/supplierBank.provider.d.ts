import { SupplierBankAccount } from './entities/supplierBankAccount.entity';
import { DataSource } from 'typeorm';
export declare const supplierBankProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<SupplierBankAccount>;
    inject: string[];
}[];
