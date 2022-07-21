import { ReturOrderDetail } from './../../returOrder/entities/returOrderDetail.entity';
import { Stock } from './../../stock/entities/stock.entity';
import { OrderDetail } from './../../order/entities/orderDetail.entity';
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
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Price } from './price.entity';
import { ReturPurchaseDetail } from 'src/returPurchase/entities/returPurchaseDetail.entity';

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

  @OneToMany(() => OrderDetail, (o) => o.product)
  orderDetails: OrderDetail[];

  @OneToOne(() => Stock, (s) => s.product)
  stock: Stock;

  @OneToOne(() => ReturPurchaseDetail, (rpd) => rpd.product)
  returPurchaseDetails: ReturPurchaseDetail[];

  @OneToOne(() => ReturOrderDetail, (rpd) => rpd.product)
  returOrderDetails: ReturOrderDetail[];
}
