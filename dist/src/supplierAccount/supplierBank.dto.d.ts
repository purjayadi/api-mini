export declare class FindSupplierBankDto {
    readonly limit: number;
    readonly offset: number;
    readonly query: string;
}
export declare class CreateSupplierBankDto {
    readonly supplierId: string;
    readonly code: number;
    readonly name: string;
    readonly account: number;
}
