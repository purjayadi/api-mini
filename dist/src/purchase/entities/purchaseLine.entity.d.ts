import { Unit } from './../../unit/entities/unit.entity';
import { Product } from './../../product/entities/product.entity';
import { PurchaseOrder } from './purchase.entity';
import { BaseColumn } from 'src/utils/base.entity';
export declare class PurchaseOrderLine extends BaseColumn {
    id: string;
    purchaseOrderId: string;
    productId: string;
    quantity: number;
    unitId: string;
    price: number;
    subTotal: number;
    purchaseOrder: PurchaseOrder;
    product: Product;
    unit: Unit;
}
