import { Category } from 'src/category/entities/category.entity';
import { BaseColumn } from 'src/utils/base.entity';
export declare class Kas extends BaseColumn {
    id: string;
    date: Date;
    source: string;
    categoryId: string;
    debit: number;
    credit: number;
    description: string;
    category: Category;
}
