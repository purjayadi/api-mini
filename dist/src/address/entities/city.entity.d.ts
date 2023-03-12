import { Customer } from './../../customer/entities/customer.entity';
import { District } from './district.entity';
export declare class City {
    id: number;
    name: string;
    provinceId: number;
    districts: District[];
    customer: Customer[];
}
