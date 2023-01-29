import { Product } from './../../product/entities/product.entity';
import { Unit } from './../../unit/entities/unit.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ReturOrder } from './returOrder.entity';

@Entity()
export class ReturOrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  returOrderId: string;

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

  @ManyToOne(() => Unit, (p) => p.returOrderDetails, {
    onUpdate: 'CASCADE',
    eager: true,
  })
  unit: Unit;

  @ManyToOne(() => Product, (u) => u.returOrderDetails, {
    onUpdate: 'CASCADE',
  })
  product: Product;

  @ManyToOne(() => ReturOrder, (rp) => rp.returOrderDetails, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  returOrder: ReturOrder;
}
