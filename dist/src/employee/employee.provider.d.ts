import { Employee } from './entities/employee.entity';
import { DataSource } from 'typeorm';
export declare const employeeProviders: {
    provide: string;
    useFactory: (dataSource: DataSource) => import("typeorm").Repository<Employee>;
    inject: string[];
}[];
