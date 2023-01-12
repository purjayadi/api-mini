import { RolePermission } from './../entities/rolePermission.entity';
import { DataSource } from 'typeorm';
export declare const rolePermissionProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<RolePermission>;
    inject: string[];
}[];
