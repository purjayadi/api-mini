import { PaymentMethod } from './entities/order.entity';
import { Status } from './entities/order.entity';
export declare class FindOrderDto {
    readonly limit: number;
    readonly offset: number;
    readonly query: string;
    readonly withDeleted: string;
    readonly orderBy: string;
    readonly order: string;
    readonly search: string;
}
export declare class CreateOrderDto {
    date: Date;
    customerId: string;
    employeeId: string;
    paymentMethod: PaymentMethod;
    dueDate: Date;
    total: number;
    orderDetails: OrderDetail[];
    payment: number;
    status: Status;
}
declare const UpdateOrderDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateOrderDto>>;
export declare class UpdateOrderDto extends UpdateOrderDto_base {
}
export declare class OrderDetail {
    orderId: string;
    productId: string;
    quantity: number;
    price: number;
    discount: number;
    subTotal: number;
    unitId: string;
    product: any;
}
export {};
