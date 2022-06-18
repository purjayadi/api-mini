import { Employee } from './../../employee/entities/employee.entity';
import { Customer } from './../../customer/entities/customer.entity';
import { BaseColumn } from 'src/utils/base.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetail } from './orderDetail.entity';

export enum PaymentMethod {
  CASH = 'Cash',
  TRANSFER = 'Transfer',
  DUE_DATE = 'Due Date',
}

export enum Status {
  COMPLETED = 'Completed',
  CANCELED = 'Canceled',
}

@Entity()
export class Order extends BaseColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  invNumber: string;

  @Column({
    type: 'date',
  })
  date: Date;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.COMPLETED,
  })
  status: Status;

  @Column({
    type: 'decimal',
  })
  total: number;

  @Column()
  customerId: string;

  @Column()
  employeeId: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  dueDate: Date;

  @Column({
    nullable: true,
  })
  createdBy: string;

  @Column({
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.CASH,
  })
  paymentMethod: PaymentMethod;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order, {
    cascade: true,
    eager: true,
  })
  orderDetails: OrderDetail[];

  @ManyToOne(() => Customer, (c) => c.orders, {
    eager: true,
  })
  customer: Customer;

  @ManyToOne(() => Employee, (e) => e.orders, {
    eager: true,
  })
  employee: Employee;
}
