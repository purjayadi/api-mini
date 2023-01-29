import { Product } from './../../product/entities/product.entity';
import { BaseColumn } from 'src/utils/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Stock extends BaseColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productId: string;

  @Column({
    type: 'int',
    default: 0,
  })
  quantity: number;

  @OneToOne(() => Product, (product) => product.stock)
  @JoinColumn()
  product: Product;
}
