import { ReturOrder } from './../../returOrder/entities/returOrder.entity';
import { Employee } from './../../employee/entities/employee.entity';
import { Customer } from './../../customer/entities/customer.entity';
import { BaseColumn } from 'src/utils/base.entity';
import {
  AfterSoftRemove,
  BeforeInsert,
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
  PO = 'Pending Order',
  COMPLETED = 'Completed',
  CANCELED = 'Canceled',
}

@Entity()
export class Order extends BaseColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    type: 'integer',
    default: 0,
  })
  code: number;

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
    default: Status.PO,
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
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
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

  @OneToMany(() => ReturOrder, (rp) => rp.order, {
    onUpdate: 'CASCADE',
  })
  returOrders: ReturOrder[];

  @AfterSoftRemove()
  updateStatus() {
    this.status = Status.CANCELED;
  }

  // generate code before create
  @BeforeInsert()
  async generateInvoice() {
    const date = new Date(this.date);
    this.code = this.code + 1;
    this.invNumber = `INV-${date.getFullYear()}${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${this.code}`;
  }
}
