import { Unit } from '../../unit/entities/unit.entity';
import { BaseColumn } from 'src/utils/base.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Price extends BaseColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productId: string;

  @Column()
  unitId: string;

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

  @ManyToOne(() => Unit, (s) => s.prices)
  unit: Unit;
}
