import { Unit } from './entities/unit.entity';
import { DataSource } from 'typeorm';
export declare const unitProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Unit>;
    inject: string[];
}[];
