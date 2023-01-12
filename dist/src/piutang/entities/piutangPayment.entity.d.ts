import { BaseColumn } from 'src/utils/base.entity';
import { PiutangPaymentDetail } from './piutangPaymentDetail.entity';
export declare enum PaymentMethod {
    CASH = "Cash",
    TRANSFER = "Transfer",
    TITIP_BAYAR = "Titip Bayar"
}
export declare class PiutangPayment extends BaseColumn {
    id: string;
    paymentNumber: string;
    date: Date;
    note: string;
    paymentMethod: PaymentMethod | string;
    piutangPaymentDetails: PiutangPaymentDetail[];
    generateInvoice(): Promise<void>;
}
