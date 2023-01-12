import { BaseColumn } from 'src/utils/base.entity';
import { Piutang } from './piutang.entity';
import { PiutangPayment } from './piutangPayment.entity';
export declare class PiutangPaymentDetail extends BaseColumn {
    id: string;
    piutangPaymentId: string;
    piutangId: string;
    amount: number;
    piutang: Piutang;
    piutangPayment: PiutangPayment;
}
