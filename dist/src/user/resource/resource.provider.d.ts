import { DataSource } from 'typeorm';
import { Resource } from '../entities/resource.entity';
export declare const resourceProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Resource>;
    inject: string[];
}[];
