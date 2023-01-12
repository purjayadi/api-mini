import { Product } from './entities/product.entity';
import { DataSource } from 'typeorm';
import { Price } from './entities/price.entity';
export declare const productProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Product>;
    inject: string[];
}[];
export declare const productPriceProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Price>;
    inject: string[];
}[];
