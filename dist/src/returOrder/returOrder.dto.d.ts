export declare class CreateReturOrderDTO {
    readonly date: Date;
    readonly total: number;
    readonly orderId: string;
    readonly categoryId: string;
    readonly userId: string;
    readonly description: string;
    readonly returOrderDetails: ReturDetailDto[];
    readonly isDecreasePiutang: boolean;
    readonly isDecreaseKas: boolean;
    readonly isIncrementStock: boolean;
}
export declare class ReturDetailDto {
    readonly returOrderId: string;
    readonly productId: string;
    readonly quantity: number;
    readonly unitId: string;
    readonly price: number;
    readonly subTotal: number;
}
declare const UpdateReturOrderDTO_base: import("@nestjs/mapped-types").MappedType<Partial<CreateReturOrderDTO>>;
export declare class UpdateReturOrderDTO extends UpdateReturOrderDTO_base {
}
export {};
