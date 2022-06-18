import { Unit } from './../../unit/entities/unit.entity';
import { Product } from './../../product/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  orderId: string;

  @Column()
  productId: string;

  @Column({
    type: 'int',
  })
  quantity: number;

  @Column({
    type: 'decimal',
  })
  price: number;

  @Column({
    type: 'decimal',
    nullable: true,
  })
  discount: number;

  @Column({
    type: 'decimal',
  })
  subTotal: number;

  @Column()
  unitId: string;

  @ManyToOne(() => Order, (order) => order.orderDetails)
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderDetails, {
    eager: true,
    onUpdate: 'CASCADE',
  })
  product: Product;

  @ManyToOne(() => Unit, (unit) => unit.orderDetails, {
    eager: true,
    onUpdate: 'CASCADE',
  })
  unit: Unit;
}
