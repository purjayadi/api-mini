export declare class findPiutang {
    readonly customer: string;
    readonly dueDate: Date;
}
export declare class IncDecDTO {
    readonly id: string;
    readonly amount: string;
}
export declare class PaymentDTO {
    readonly date: Date;
    readonly note: string;
    readonly paymentMethod: string;
    readonly userId: string;
    readonly piutangPaymentDetails: any[];
}
export declare class PiutangDTO {
    readonly piutangId: string;
    readonly amount: string;
}
