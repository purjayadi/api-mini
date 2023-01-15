import { PiutangPayment } from './entities/piutangPayment.entity';
import { DataSource } from 'typeorm';
import { Piutang } from './entities/piutang.entity';
export declare const piutangProviders: ({
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Piutang>;
    inject: string[];
} | {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<PiutangPayment>;
    inject: string[];
})[];
