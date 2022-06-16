import { BaseColumn } from 'src/utils/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Price } from './price.entity';

@Entity()
export class Unit extends BaseColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Price, (s) => s.unit, {
    onUpdate: 'CASCADE',
  })
  prices: Price[];
}
