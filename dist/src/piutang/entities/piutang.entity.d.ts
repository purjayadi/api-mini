import { Order } from './../../order/entities/order.entity';
import { BaseColumn } from 'src/utils/base.entity';
import { PiutangPaymentDetail } from './piutangPaymentDetail.entity';
export declare class Piutang extends BaseColumn {
    id: string;
    orderId: string;
    total: number;
    remaining: number;
    isPaid(): boolean;
    order: Order;
    piutangPaymentDetails: PiutangPaymentDetail[];
}
