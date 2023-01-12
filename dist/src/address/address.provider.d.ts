import { SubDistrict } from './entities/subDistrict.entity';
import { District } from './entities/district.entity';
import { City } from './entities/city.entity';
import { DataSource } from 'typeorm';
export declare const cityProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<City>;
    inject: string[];
}[];
export declare const districtProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<District>;
    inject: string[];
}[];
export declare const subDistrictProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<SubDistrict>;
    inject: string[];
}[];
