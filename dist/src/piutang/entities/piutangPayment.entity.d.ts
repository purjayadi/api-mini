import { BaseColumn } from 'src/utils/base.entity';
import { Piutang } from './piutang.entity';
export declare enum PaymentMethod {
    CASH = "Cash",
    TRANSFER = "Transfer",
    TITIP_BAYAR = "Titip Bayar"
}
export declare class PiutangPayment extends BaseColumn {
    id: string;
    piutangId: string;
    paymentNumber: string;
    date: Date;
    note: string;
    paymentMethod: PaymentMethod | string;
    amount: number;
    piutang: Piutang;
    generateInvoice(): Promise<void>;
}
