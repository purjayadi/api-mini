import { Warehouse } from './../../warehouse/entities/warehouse.entity';
import { PurchaseOrderLine } from './purchaseLine.entity';
import { Supplier } from './../../supplier/entities/supplier.entity';
import { User } from './../../user/entities/user.entity';
import { BaseColumn } from 'src/utils/base.entity';
export declare enum StatusFormat {
    PO = "Pending Order",
    PROCESS = "On Process",
    CANCEL = "Canceled",
    COMPLETE = "Done"
}
export declare class PurchaseOrder extends BaseColumn {
    id: string;
    code: string;
    date: Date;
    discount: number;
    total: number;
    status: StatusFormat;
    supplierId: string;
    description: string;
    userId: string;
    warehouseId: string;
    user: User;
    supplier: Supplier;
    purchaseLines: PurchaseOrderLine[];
    warehouse: Warehouse;
}
