export declare class CreateReturPurchaseDto {
    readonly date: Date;
    readonly total: number;
    readonly supplierId: string;
    readonly userId: string;
    readonly description: string;
    readonly returPurchaseDetails: ReturDetailDto[];
}
export declare class ReturDetailDto {
    readonly returPurchaseId: string;
    readonly productId: string;
    readonly quantity: number;
    readonly unitId: string;
    readonly price: number;
    readonly subTotal: number;
}
declare const UpdateReturPurchaseDTO_base: import("@nestjs/mapped-types").MappedType<Partial<CreateReturPurchaseDto>>;
export declare class UpdateReturPurchaseDTO extends UpdateReturPurchaseDTO_base {
}
export {};
