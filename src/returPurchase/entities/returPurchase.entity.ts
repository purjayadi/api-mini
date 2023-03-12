import { ReturPurchaseDetail } from './returPurchaseDetail.entity';
import { User } from 'src/user/entities/user.entity';
import { Supplier } from '../../supplier/entities/supplier.entity';
import { BaseColumn } from 'src/utils/base.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ReturPurchase extends BaseColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  date: Date;

  @Column()
  supplierId: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'decimal',
  })
  total: number;

  @Column()
  userId: string;

  @ManyToOne(() => Supplier, (p) => p.returPurchases, {
    onUpdate: 'CASCADE',
    eager: true,
  })
  supplier: Supplier;

  @ManyToOne(() => User, (u) => u.returPurchases, {
    onUpdate: 'CASCADE',
  })
  user: User[];

  @OneToMany(() => ReturPurchaseDetail, (p) => p.returPurchase, {
    onUpdate: 'CASCADE',
    eager: true,
    cascade: true,
  })
  returPurchaseDetails: ReturPurchaseDetail[];
}
