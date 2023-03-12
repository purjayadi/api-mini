import { Order } from './../../order/entities/order.entity';
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

  @Column()
  orderId: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'decimal',
  })
  total: number;

  @Column({
    default: false,
  })
  public readonly isDecreasePiutang: boolean;

  @Column({
    default: false,
  })
  public readonly isDecreaseKas: boolean;

  @Column({
    default: false,
  })
  public readonly isIncrementStock: boolean;

  @Column()
  userId: string;

  @ManyToOne(() => Order, (p) => p.returOrders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  order: Order;

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
