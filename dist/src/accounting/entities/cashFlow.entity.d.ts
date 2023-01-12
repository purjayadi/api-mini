import { Employee } from '../../employee/entities/employee.entity';
import { BaseColumn } from 'src/utils/base.entity';
import { Category } from 'src/category/entities/category.entity';
export declare enum typeFormat {
    DEBIT = "Debit",
    CREDIT = "Credit"
}
export declare class CashFlow extends BaseColumn {
    id: string;
    code: number;
    cashFlowNumber: string;
    date: Date;
    categoryId: string;
    type: typeFormat;
    amount: number;
    employeeId: string;
    description: string;
    employee: Employee;
    category: Category;
    generateInvoice(): Promise<void>;
}
