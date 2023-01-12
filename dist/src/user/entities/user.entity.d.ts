import { ReturOrder } from './../../returOrder/entities/returOrder.entity';
import { PurchaseOrder } from './../../purchase/entities/purchase.entity';
import { Employee } from './../../employee/entities/employee.entity';
import { BaseColumn } from 'src/utils/base.entity';
import { Role } from './role.entity';
import { ReturPurchase } from 'src/returPurchase/entities/returPurchase.entity';
export declare class User extends BaseColumn {
    id: string;
    username: string;
    password: string;
    employeeId: string;
    isActive: boolean;
    roleId: string;
    role: Role;
    purchases: PurchaseOrder[];
    employee: Employee;
    hashPassword(): Promise<void>;
    validatePassword(password: string): Promise<boolean>;
    returPurchases: ReturPurchase[];
    returOrders: ReturOrder[];
}
