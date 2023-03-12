import { BaseColumn } from 'src/utils/base.entity';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ManyToOne } from 'typeorm';
import { Piutang } from './piutang.entity';

export enum PaymentMethod {
  CASH = 'Cash',
  TRANSFER = 'Transfer',
  TITIP_BAYAR = 'Titip Bayar',
}

@Entity()
export class PiutangPayment extends BaseColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  piutangId: string;

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

  @Column({
    type: 'decimal',
  })
  amount: number;

  @ManyToOne(() => Piutang, (p) => p.piutangPayments, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  piutang: Piutang;

  // generate code before create
  @BeforeInsert()
  async generateInvoice() {
    const date = new Date(this.date);
    this.paymentNumber = `NH-${date.getFullYear()}${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${Math.floor(Math.random() * 10000)}`;
  }
}
