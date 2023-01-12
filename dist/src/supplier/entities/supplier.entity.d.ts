import { PurchaseOrder } from './../../purchase/entities/purchase.entity';
import { Product } from './../../product/entities/product.entity';
import { BaseColumn } from 'src/utils/base.entity';
import { ReturPurchase } from 'src/returPurchase/entities/returPurchase.entity';
export declare class Supplier extends BaseColumn {
    id: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    products: Product[];
    purchases: PurchaseOrder[];
    returPurchases: ReturPurchase[];
}
