import { PurchaseOrder } from './../../purchase/entities/purchase.entity';
import { Product } from './../../product/entities/product.entity';
import { BaseColumn } from 'src/utils/base.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Warehouse extends BaseColumn {
  // entity warehouse
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @ManyToMany(() => Product, (p) => p.warehouses, {
    onUpdate: 'CASCADE',
  })
  products: Product[];

  @OneToMany(() => PurchaseOrder, (p) => p.warehouse)
  purchaseOrders: PurchaseOrder[];
}
