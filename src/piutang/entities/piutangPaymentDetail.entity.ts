import { BaseColumn } from 'src/utils/base.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

  @ManyToOne(() => PiutangPayment, (p) => p.piutangPaymentDetails, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  piutangPayment: PiutangPayment;
}
