import { Product } from './../../product/entities/product.entity';
import { Unit } from './../../unit/entities/unit.entity';
import { ReturOrder } from './returOrder.entity';
export declare class ReturOrderDetail {
    id: string;
    returOrderId: string;
    productId: string;
    quantity: number;
    unitId: string;
    price: number;
    subTotal: number;
    unit: Unit;
    product: Product;
    returOrder: ReturOrder;
}
