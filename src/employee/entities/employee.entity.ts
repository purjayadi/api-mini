import { Order } from './../../order/entities/order.entity';
import { Schedule } from './../../schedule/entities/schedule.entity';
import { User } from './../../user/entities/user.entity';
import { Customer } from './../../customer/entities/customer.entity';
import { BaseColumn } from '../../utils/base.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CashFlow } from 'src/accounting/entities/cashFlow.entity';

export enum GenderFormat {
  MALE = 'male',
  FEMALE = 'female',
}

export enum StatusFormat {
  MARRIED = 'married',
  SINGLE = 'single',
}

@Entity()
export class Employee extends BaseColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({
    nullable: true,
  })
  email: string;

  @Column({
    type: 'text',
  })
  address: string;

  @Column({
    type: 'enum',
    enum: GenderFormat,
    default: GenderFormat.MALE,
  })
  gender: GenderFormat;

  @Column({
    default: 'employee.jpg',
  })
  photo: string;

  @Column()
  joinDate: Date;

  @Column({
    type: 'enum',
    enum: StatusFormat,
    default: StatusFormat.SINGLE,
  })
  status: StatusFormat;

  @Column({
    default: 1,
  })
  isActive: boolean;

  @OneToMany(() => Customer, (c) => c.employee)
  customers: Customer[];

  @OneToOne(() => User, (u) => u.employee, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => Schedule, (s) => s.employee, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  schedules: Schedule[];

  @OneToMany(() => Order, (o) => o.employee)
  orders: Order[];

  @OneToMany(() => CashFlow, (o) => o.employee, {
    onUpdate: 'CASCADE',
  })
  cashFlow: CashFlow[];
}
