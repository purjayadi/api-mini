import { Product } from './../../product/entities/product.entity';
import { BaseColumn } from 'src/utils/base.entity';
export declare class Stock extends BaseColumn {
    id: string;
    productId: string;
    quantity: number;
    product: Product;
}
