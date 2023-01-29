import { Order } from './../../order/entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import { BaseColumn } from 'src/utils/base.entity';
import { ReturOrderDetail } from './returOrderDetail.entity';
export declare class ReturOrder extends BaseColumn {
    id: string;
    code: string;
    date: Date;
    orderId: string;
    description: string;
    total: number;
    readonly isDecreasePiutang: boolean;
    readonly isDecreaseKas: boolean;
    readonly isIncrementStock: boolean;
    userId: string;
    order: Order;
    user: User;
    returOrderDetails: ReturOrderDetail[];
}
