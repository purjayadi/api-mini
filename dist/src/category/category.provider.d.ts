import { DataSource } from 'typeorm';
import { Category } from './entities/category.entity';
export declare const CategoryProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Category>;
    inject: string[];
}[];
