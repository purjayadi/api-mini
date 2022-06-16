import { Unit } from './../../unit/entities/unit.entity';
import { Product } from './../../product/entities/product.entity';
import { PurchaseOrder } from './purchase.entity';
import { BaseColumn } from 'src/utils/base.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PurchaseOrderLine extends BaseColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  purchaseOrderId: string;

  @Column()
  productId: string;

  @Column()
  quantity: number;

  @Column()
  unitId: string;

  @Column({
    type: 'decimal',
  })
  price: number;

  @Column({
    type: 'decimal',
  })
  subTotal: number;

  @ManyToOne(() => PurchaseOrder, (po) => po.purchaseLines)
  purchaseOrder: PurchaseOrder;

  @ManyToOne(() => Product, (p) => p.purchaseLines, {
    eager: true,
  })
  product: Product;

  @ManyToOne(() => Unit, (u) => u.purchaseLines, {
    eager: true,
  })
  unit: Unit;
}
