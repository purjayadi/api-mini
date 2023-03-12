import { Employee } from './../../employee/entities/employee.entity';
import { Customer } from './../../customer/entities/customer.entity';
import { ScheduleDetail } from './scheduleDetail.entity';
import { BaseColumn } from 'src/utils/base.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum StatusFormat {
  PENDING = 'Pending',
  PROCESS = 'On Process',
  CANCEL = 'Canceled',
  COMPLETE = 'Done',
}
@Entity()
export class Schedule extends BaseColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  date: Date;

  @Column({
    select: false,
  })
  customerId: string;

  @Column({
    select: false,
  })
  employeeId: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'enum',
    enum: StatusFormat,
    default: StatusFormat.PENDING,
  })
  status: StatusFormat;

  @OneToMany(() => ScheduleDetail, (c) => c.schedule, {
    cascade: true,
    eager: true,
  })
  scheduleDetails: ScheduleDetail[];

  @ManyToOne(() => Customer, (c) => c.schedules, {
    eager: true,
  })
  customer: Customer;

  @ManyToOne(() => Employee, (e) => e.schedules, {
    eager: true,
  })
  employee: Employee;
}
