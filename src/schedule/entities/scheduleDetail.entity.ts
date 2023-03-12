import { Unit } from './../../unit/entities/unit.entity';
import { Product } from './../../product/entities/product.entity';
import { Schedule } from './schedule.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ScheduleDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    select: false,
  })
  scheduleId: string;

  @Column()
  productId: string;

  @Column({
    type: 'integer',
  })
  quantity: number;

  @Column()
  unitId: string;

  @ManyToOne(() => Schedule, (c) => c.scheduleDetails, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  schedule: Schedule;

  @ManyToOne(() => Product, (p) => p.scheduleDetails, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  product: Product;

  @ManyToOne(() => Unit, (p) => p.scheduleDetails, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
  })
  unit: Unit;
}
