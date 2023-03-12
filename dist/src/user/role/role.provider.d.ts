import { DataSource } from 'typeorm';
import { Role } from '../entities/role.entity';
export declare const roleProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Role>;
    inject: string[];
}[];
