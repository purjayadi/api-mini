import { BaseColumn } from 'src/utils/base.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Piutang } from './piutang.entity';
import { PiutangPaymentDetail } from './piutangPaymentDetail.entity';

export enum PaymentMethod {
  CASH = 'Cash',
  TRANSFER = 'Transfer',
}

@Entity()
export class PiutangPayment extends BaseColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  paymentNumber: string;

  @Column()
  date: Date;

  @Column()
  piutangId: string;

  @Column({
    nullable: true,
  })
  note: string;

  @Column()
  paymentMethod: PaymentMethod | string;

  @ManyToOne(() => Piutang, (p) => p.payments, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  piutang: Piutang;

  @OneToMany(() => PiutangPaymentDetail, (p) => p.piutangPayment, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    eager: true,
    cascade: true,
  })
  piutangPaymentDetails: PiutangPaymentDetail[];

  // generate code before create
  @BeforeInsert()
  async generateInvoice() {
    const date = new Date(this.date);
    this.paymentNumber = `INV-${date.getFullYear()}${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${Math.floor(Math.random() * 10000)}`;
  }
}
