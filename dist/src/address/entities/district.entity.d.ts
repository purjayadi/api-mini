import { Customer } from './../../customer/entities/customer.entity';
import { City } from './city.entity';
import { SubDistrict } from './subDistrict.entity';
export declare class District {
    id: number;
    name: string;
    cityId: number;
    city: City;
    subDistricts: SubDistrict[];
    customer: Customer[];
}
