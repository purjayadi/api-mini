import { ReturPurchase } from 'src/returPurchase/entities/returPurchase.entity';
import { Product } from './../../product/entities/product.entity';
import { Unit } from './../../unit/entities/unit.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ReturPurchaseDetail {
  // entity warehouse
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    select: false,
  })
  returPurchaseId: string;

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

  @ManyToOne(() => Unit, (p) => p.returPurchaseDetails, {
    onUpdate: 'CASCADE',
    eager: true,
  })
  unit: Unit;

  @ManyToOne(() => Product, (u) => u.returPurchaseDetails, {
    onUpdate: 'CASCADE',
    eager: true,
  })
  product: Product;

  @ManyToOne(() => ReturPurchase, (rp) => rp.returPurchaseDetails, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  returPurchase: ReturPurchase;
}
