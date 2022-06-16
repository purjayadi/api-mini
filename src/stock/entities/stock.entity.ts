import { BaseColumn } from 'src/utils/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stock extends BaseColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  productId: string;

  @Column()
  unitId: string;

  @Column({
    type: 'int',
    default: 0,
  })
  quantity: number;
}
