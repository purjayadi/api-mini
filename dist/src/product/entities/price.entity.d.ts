import { Unit } from '../../unit/entities/unit.entity';
import { Product } from './product.entity';
export declare class Price {
    id: string;
    productId: string;
    unitId: string;
    isBaseUnit: boolean;
    value: number;
    price: number;
    product: Product;
    unit: Unit;
}
