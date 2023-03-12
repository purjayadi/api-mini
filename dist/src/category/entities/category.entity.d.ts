import { Product } from 'src/product/entities/product.entity';
import { CashFlow } from 'src/accounting/entities/cashFlow.entity';
export declare class Category {
    id: string;
    name: string;
    products: Product[];
    cashFlows: CashFlow[];
    kas: CashFlow[];
}
