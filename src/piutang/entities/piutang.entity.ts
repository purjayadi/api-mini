import { Order } from './../../order/entities/order.entity';
import { BaseColumn } from 'src/utils/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PiutangPayment } from './piutangPayment.entity';

@Entity()
export class Piutang extends BaseColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderId: string;

  @Column({
    type: 'decimal',
  })
  total: number;

  @Column({
    type: 'decimal',
  })
  remaining: number;

  isPaid(): boolean {
    return this.remaining === 0;
  }

  @OneToOne(() => Order, (order) => order.piutang, {
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  order: Order;

  @OneToMany(() => PiutangPayment, (payment) => payment.piutang, {
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  piutangPayments: PiutangPayment[];
}
