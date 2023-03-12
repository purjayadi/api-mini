import { Unit } from '../../unit/entities/unit.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Price {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productId: string;

  @Column()
  unitId: string;

  @Column({
    default: 0,
  })
  isBaseUnit: boolean;

  @Column({
    type: 'int',
    default: 1,
  })
  value: number;

  @Column({
    type: 'decimal',
  })
  price: number;

  @ManyToOne(() => Product, (s) => s.prices)
  product: Product;

  @ManyToOne(() => Unit, (s) => s.prices, {
    eager: true,
  })
  unit: Unit;
}
