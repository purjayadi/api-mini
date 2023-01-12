import { Customer } from './../../customer/entities/customer.entity';
import { User } from 'src/user/entities/user.entity';
import { BaseColumn } from 'src/utils/base.entity';
import { ReturOrderDetail } from './returOrderDetail.entity';
export declare class ReturOrder extends BaseColumn {
    id: string;
    code: string;
    date: Date;
    customerId: string;
    description: string;
    total: number;
    userId: string;
    customer: Customer;
    user: User;
    returOrderDetails: ReturOrderDetail[];
}
