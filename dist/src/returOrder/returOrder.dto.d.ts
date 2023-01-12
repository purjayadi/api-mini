export declare class CreateReturOrderDTO {
    readonly date: Date;
    readonly total: number;
    readonly customerId: string;
    readonly userId: string;
    readonly description: string;
    readonly returOrderDetails: ReturDetailDto[];
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
