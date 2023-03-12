import { Customer } from './../../customer/entities/customer.entity';
import { District } from './district.entity';
export declare class SubDistrict {
    id: number;
    name: string;
    districtId: number;
    district: District;
    customer: Customer[];
}
