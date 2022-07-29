import { BaseColumn } from 'src/utils/base.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Piutang } from './piutang.entity';
import { PiutangPayment } from './piutangPayment.entity';

@Entity()
export class PiutangPaymentDetail extends BaseColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  piutangPaymentId: string;

  @Column()
  piutangId: string;

  @Column({
    type: 'decimal',
  })
  amount: number;

  @ManyToOne(() => Piutang, (p) => p.piutangPaymentDetails, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  piutang: Piutang;

  @ManyToOne(() => PiutangPayment, (p) => p.piutangPaymentDetails, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    eager: true,
  })
  piutangPayment: PiutangPayment;
}
