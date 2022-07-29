import { ReturOrder } from './../../returOrder/entities/returOrder.entity';
import { Order } from './../../order/entities/order.entity';
import { Schedule } from './../../schedule/entities/schedule.entity';
import { Employee } from './../../employee/entities/employee.entity';
import { BaseColumn } from '../../utils/base.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from '../../address/entities/city.entity';
import { SubDistrict } from '../../address/entities/subDistrict.entity';
import { District } from '../../address/entities/district.entity';

@Entity()
export class Customer extends BaseColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    type: 'integer',
    default: 0,
  })
  code: number;

  @Column({ unique: true })
  customerNumber: string;

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

  @OneToMany(() => Schedule, (s) => s.customer, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  schedules: Schedule[];

  @OneToMany(() => Order, (o) => o.customer)
  orders: Order[];

  @OneToMany(() => ReturOrder, (rp) => rp.customer, {
    onUpdate: 'CASCADE',
  })
  returOrders: ReturOrder[];

  @BeforeInsert()
  async generateInvoice() {
    const date = new Date(this.joinDate);
    this.code = this.code + 1;
    this.customerNumber = `CGM-${date.getFullYear()}${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${this.code}`;
  }
}
