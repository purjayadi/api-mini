import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
export declare const databaseProviders: {
    provide: string;
    useFactory: (configService: ConfigService) => Promise<DataSource>;
    inject: (typeof ConfigService)[];
}[];
