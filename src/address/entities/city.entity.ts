import { Customer } from './../../customer/entities/customer.entity';
import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { District } from './district.entity';

@Entity()
export class City {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({
    select: false,
  })
  provinceId: number;

  @OneToMany(() => District, (District) => District.city, {
    onUpdate: 'CASCADE',
    cascade: true,
  })
  @JoinTable()
  districts: District[];

  @OneToMany(() => Customer, (u) => u.city, {
    onUpdate: 'CASCADE',
    cascade: true,
  })
  customer: Customer[];
}
