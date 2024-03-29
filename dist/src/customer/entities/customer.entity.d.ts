import { Order } from './../../order/entities/order.entity';
import { Schedule } from './../../schedule/entities/schedule.entity';
import { Employee } from './../../employee/entities/employee.entity';
import { BaseColumn } from '../../utils/base.entity';
import { City } from '../../address/entities/city.entity';
import { SubDistrict } from '../../address/entities/subDistrict.entity';
import { District } from '../../address/entities/district.entity';
export declare class Customer extends BaseColumn {
    id: string;
    code: number;
    customerNumber: string;
    name: string;
    shopName: string;
    address: string;
    phone: string;
    photo: string;
    gps: string;
    employeeId: string;
    joinDate: Date;
    cityId: number;
    districtId: number;
    subDistrictId: number;
    city: City;
    district: District;
    subDistrict: SubDistrict;
    employee: Employee;
    schedules: Schedule[];
    orders: Order[];
    generateInvoice(): Promise<void>;
}
