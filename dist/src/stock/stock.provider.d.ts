import { Stock } from './entities/stock.entity';
import { DataSource } from 'typeorm';
export declare const stockProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Stock>;
    inject: string[];
}[];
