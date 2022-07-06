import { Employee } from './../../employee/entities/employee.entity';
import { Customer } from './../../customer/entities/customer.entity';
import { BaseColumn } from 'src/utils/base.entity';
import {
  AfterSoftRemove,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderDetail } from './orderDetail.entity';
import { Piutang } from 'src/piutang/entities/piutang.entity';

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
  date: Date | string;

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

  @Column({
    select: false,
  })
  customerId: string;

  @Column({
    select: false,
  })
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
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
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

  @OneToOne(() => Piutang, (piutang) => piutang.order, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  piutang: Piutang;

  @AfterSoftRemove()
  updateStatus() {
    this.status = Status.CANCELED;
  }
}
