import { ReturPurchaseDetail } from './returPurchaseDetail.entity';
import { User } from 'src/user/entities/user.entity';
import { Supplier } from '../../supplier/entities/supplier.entity';
import { BaseColumn } from 'src/utils/base.entity';
export declare class ReturPurchase extends BaseColumn {
    id: string;
    code: string;
    date: Date;
    supplierId: string;
    description: string;
    total: number;
    userId: string;
    supplier: Supplier;
    user: User[];
    returPurchaseDetails: ReturPurchaseDetail[];
}
