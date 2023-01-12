import { User } from './entities/user.entity';
import { DataSource } from 'typeorm';
export declare const userProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<User>;
    inject: string[];
}[];
