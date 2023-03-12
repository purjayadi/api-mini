import { ReturOrder } from './../../returOrder/entities/returOrder.entity';
import { Employee } from './../../employee/entities/employee.entity';
import { Customer } from './../../customer/entities/customer.entity';
import { BaseColumn } from 'src/utils/base.entity';
import { OrderDetail } from './orderDetail.entity';
import { Piutang } from 'src/piutang/entities/piutang.entity';
export declare enum PaymentMethod {
    CASH = "Cash",
    TRANSFER = "Transfer",
    DUE_DATE = "Due Date"
}
export declare enum Status {
    PO = "Pending Order",
    COMPLETED = "Completed",
    CANCELED = "Canceled"
}
export declare class Order extends BaseColumn {
    id: string;
    code: number;
    invNumber: string;
    date: Date;
    status: Status;
    total: number;
    customerId: string;
    employeeId: string;
    dueDate: Date;
    createdBy: string;
    paymentMethod: PaymentMethod;
    orderDetails: OrderDetail[];
    customer: Customer;
    employee: Employee;
    piutang: Piutang;
    returOrders: ReturOrder[];
    updateStatus(): void;
    generateInvoice(): Promise<void>;
}
