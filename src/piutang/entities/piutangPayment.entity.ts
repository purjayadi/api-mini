import { BaseColumn } from 'src/utils/base.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
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

  @Column({
    nullable: true,
  })
  note: string;

  @Column()
  paymentMethod: PaymentMethod | string;

  @OneToMany(() => PiutangPaymentDetail, (p) => p.piutangPayment, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
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
