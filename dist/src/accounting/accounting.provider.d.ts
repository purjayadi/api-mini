import { DataSource } from 'typeorm';
import { CashFlow } from './entities/cashFlow.entity';
import { Kas } from './entities/kas.entity';
export declare const kasProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Kas>;
    inject: string[];
}[];
export declare const cashFlowProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<CashFlow>;
    inject: string[];
}[];
