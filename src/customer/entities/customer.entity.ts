import { Employee } from './../../employee/entities/employee.entity';
import { BaseColumn } from '../../utils/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from '../../address/entities/city.entity';
import { SubDistrict } from '../../address/entities/subDistrict.entity';
import { District } from '../../address/entities/district.entity';

@Entity()
export class Customer extends BaseColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column()
  shopName: string;

  @Column({
    type: 'text',
  })
  address: string;

  @Column()
  phone: string;

  @Column({ default: 'toko.jpg' })
  photo: string;

  @Column()
  gps: string;

  @Column({
    nullable: true,
    select: false,
  })
  employeeId: string;

  @Column()
  joinDate: Date;

  @Column({
    select: false,
  })
  cityId: number;

  @Column({
    select: false,
  })
  districtId: number;

  @Column({
    select: false,
  })
  subDistrictId: number;

  @ManyToOne(() => City, (c) => c.customer, {
    eager: true,
  })
  city: City;

  @ManyToOne(() => District, (d) => d.customer, {
    eager: true,
  })
  district: District;

  @ManyToOne(() => SubDistrict, (s) => s.customer, {
    eager: true,
  })
  subDistrict: SubDistrict;

  @ManyToOne(() => Employee, (e) => e.customers, {
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
    eager: true,
  })
  employee: Employee;
}
