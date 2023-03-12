import { ReturPurchase } from 'src/returPurchase/entities/returPurchase.entity';
import { Product } from './../../product/entities/product.entity';
import { Unit } from './../../unit/entities/unit.entity';
export declare class ReturPurchaseDetail {
    id: string;
    returPurchaseId: string;
    productId: string;
    quantity: number;
    unitId: string;
    price: number;
    subTotal: number;
    unit: Unit;
    product: Product;
    returPurchase: ReturPurchase;
}
