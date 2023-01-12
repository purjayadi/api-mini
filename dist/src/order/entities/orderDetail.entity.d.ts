import { Unit } from './../../unit/entities/unit.entity';
import { Product } from './../../product/entities/product.entity';
import { Order } from './order.entity';
export declare class OrderDetail {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
    discount: number;
    subTotal: number;
    unitId: string;
    order: Order;
    product: Product;
    unit: Unit;
}
