import { Warehouse } from './../../warehouse/entities/warehouse.entity';
import { PurchaseOrderLine } from './purchaseLine.entity';
import { Supplier } from './../../supplier/entities/supplier.entity';
import { User } from './../../user/entities/user.entity';
import { BaseColumn } from 'src/utils/base.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum StatusFormat {
  PO = 'Pending Order',
  PROCESS = 'On Process',
  CANCEL = 'Canceled',
  COMPLETE = 'Done',
}
@Entity()
export class PurchaseOrder extends BaseColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  code: string;

  @Column()
  date: Date;

  @Column()
  discount: number;

  @Column()
  total: number;

  @Column({
    type: 'enum',
    enum: StatusFormat,
    default: StatusFormat.PO,
  })
  status: StatusFormat;

  @Column()
  supplierId: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column()
  userId: string;

  @Column()
  warehouseId: string;

  @ManyToOne(() => User, (u) => u.purchases)
  user: User;

  @ManyToOne(() => Supplier, (s) => s.purchases, {
    eager: true,
  })
  supplier: Supplier;

  @OneToMany(() => PurchaseOrderLine, (pl) => pl.purchaseOrder, {
    onDelete: 'CASCADE',
    cascade: true,
    eager: true,
  })
  purchaseLines: PurchaseOrderLine[];

  @ManyToOne(() => Warehouse, (w) => w.purchaseOrders, {
    eager: true,
  })
  warehouse: Warehouse;
}
