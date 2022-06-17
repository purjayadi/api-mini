import { ScheduleDetail } from './../../schedule/entities/scheduleDetail.entity';
import { PurchaseOrderLine } from './../../purchase/entities/purchaseLine.entity';
import { Warehouse } from './../../warehouse/entities/warehouse.entity';
import { Supplier } from './../../supplier/entities/supplier.entity';
import { BaseColumn } from 'src/utils/base.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Price } from './price.entity';

@Entity()
export class Product extends BaseColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column()
  purchasePrice: number;

  @Column({
    select: false,
  })
  supplierId: string;

  @ManyToOne(() => Supplier, (s) => s.products, {
    onUpdate: 'CASCADE',
    cascade: true,
    eager: true,
  })
  supplier: Supplier;

  @OneToMany(() => Price, (s) => s.product, {
    onUpdate: 'CASCADE',
    cascade: true,
    eager: true,
  })
  prices: Price[];

  @ManyToMany(() => Warehouse, (w) => w.products, {
    onUpdate: 'CASCADE',
    cascade: true,
  })
  warehouses: Warehouse[];

  @OneToMany(() => PurchaseOrderLine, (p) => p.product)
  purchaseLines: PurchaseOrderLine[];

  @OneToMany(() => ScheduleDetail, (s) => s.product)
  scheduleDetails: ScheduleDetail[];
}
