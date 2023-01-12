import { PurchaseOrder } from './../../purchase/entities/purchase.entity';
import { Product } from './../../product/entities/product.entity';
import { BaseColumn } from 'src/utils/base.entity';
export declare class Warehouse extends BaseColumn {
    id: string;
    name: string;
    address: string;
    phone: string;
    products: Product[];
    purchaseOrders: PurchaseOrder[];
}
