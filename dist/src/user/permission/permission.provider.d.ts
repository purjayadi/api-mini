import { DataSource } from 'typeorm';
import { Permission } from '../entities/permission.entity';
export declare const permissionProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Permission>;
    inject: string[];
}[];
