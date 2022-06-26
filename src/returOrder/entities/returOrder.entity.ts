import { Customer } from './../../customer/entities/customer.entity';
import { User } from 'src/user/entities/user.entity';
import { BaseColumn } from 'src/utils/base.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ReturOrderDetail } from './returOrderDetail.entity';

@Entity()
export class ReturOrder extends BaseColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  date: Date;

  @Column({
    select: false,
  })
  customerId: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'decimal',
  })
  total: number;

  @Column({
    select: false,
  })
  userId: string;

  @ManyToOne(() => Customer, (p) => p.returOrders, {
    onUpdate: 'CASCADE',
  })
  customer: Customer;

  @ManyToOne(() => User, (u) => u.returOrders, {
    onUpdate: 'CASCADE',
  })
  user: User;

  @OneToMany(() => ReturOrderDetail, (p) => p.returOrder, {
    onUpdate: 'CASCADE',
    eager: true,
    cascade: true,
  })
  returOrderDetails: ReturOrderDetail[];
}
