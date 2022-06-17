import { ScheduleDetail } from './../../schedule/entities/scheduleDetail.entity';
import { PurchaseOrderLine } from './../../purchase/entities/purchaseLine.entity';
import { Price } from '../../product/entities/price.entity';
import { BaseColumn } from 'src/utils/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Unit extends BaseColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Price, (s) => s.unit, {
    onUpdate: 'CASCADE',
  })
  prices: Price[];

  @OneToMany(() => PurchaseOrderLine, (pol) => pol.unit, {
    onUpdate: 'CASCADE',
  })
  purchaseLines: PurchaseOrderLine[];

  @OneToMany(() => ScheduleDetail, (s) => s.unit)
  scheduleDetails: ScheduleDetail[];
}