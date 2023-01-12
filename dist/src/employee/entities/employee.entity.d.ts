import { Order } from './../../order/entities/order.entity';
import { Schedule } from './../../schedule/entities/schedule.entity';
import { User } from './../../user/entities/user.entity';
import { Customer } from './../../customer/entities/customer.entity';
import { BaseColumn } from '../../utils/base.entity';
import { CashFlow } from 'src/accounting/entities/cashFlow.entity';
export declare enum GenderFormat {
    MALE = "male",
    FEMALE = "female"
}
export declare enum StatusFormat {
    MARRIED = "married",
    SINGLE = "single"
}
export declare class Employee extends BaseColumn {
    id: string;
    code: string;
    name: string;
    phone: string;
    email: string;
    address: string;
    gender: GenderFormat;
    photo: string;
    joinDate: Date;
    status: StatusFormat;
    isActive: boolean;
    customers: Customer[];
    user: User;
    schedules: Schedule[];
    orders: Order[];
    cashFlow: CashFlow[];
}
