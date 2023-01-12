import { StatusFormat } from './entities/purchase.entity';
export declare class CreatePurchaseDto {
    code: string;
    date: Date;
    discount: number;
    total: number;
    status: StatusFormat;
    supplierId: string;
    description: string;
    userId: string;
    warehouseId: string;
    purchaseLines: PurchaseLine[];
}
export declare class PurchaseLine {
    productId: string;
    quantity: number;
    unitId: string;
    price: number;
    subTotal: number;
}
declare const UpdatePurchaseDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreatePurchaseDto>>;
export declare class UpdatePurchaseDto extends UpdatePurchaseDto_base {
}
export declare class FindPurchaseDto {
    readonly limit: number;
    readonly offset: number;
    readonly query: string;
}
export {};
