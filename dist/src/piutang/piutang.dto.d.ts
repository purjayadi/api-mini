export declare class findPiutang {
    readonly customer: string;
    readonly dueDate: Date;
}
export declare class IncDecDTO {
    readonly id: string;
    readonly amount: number;
}
export declare class PaymentDTO {
    readonly date: Date;
    readonly note: string;
    readonly piutangId: string;
    readonly paymentMethod: string;
    readonly userId: string;
    readonly amount: number;
    readonly categoryId: string;
}
export declare class PiutangDTO {
    readonly piutangId: string;
    readonly amount: string;
}
