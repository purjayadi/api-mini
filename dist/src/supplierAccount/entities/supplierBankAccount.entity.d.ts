import { BaseColumn } from 'src/utils/base.entity';
export declare class SupplierBankAccount extends BaseColumn {
    id: string;
    supplierId: string;
    code: number;
    accountNumber: number;
    name: string;
}
