import { Employee } from '../../employee/entities/employee.entity';
import { BaseColumn } from 'src/utils/base.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from 'src/category/entities/category.entity';

export enum typeFormat {
  DEBIT = 'Debit',
  CREDIT = 'Credit',
}

@Entity()
export class CashFlow extends BaseColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    type: 'integer',
    default: 0,
  })
  code: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  cashFlowNumber: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  date: Date;

  @Column()
  categoryId: string;

  // @Column({
  //   nullable: true,
  // })
  // toCategoryId: string;

  @Column({
    type: 'enum',
    enum: typeFormat,
    default: typeFormat.DEBIT,
  })
  type: typeFormat;

  @Column({
    type: 'decimal',
  })
  amount: number;

  @Column()
  employeeId: string;

  @Column()
  description: string;

  @ManyToOne(() => Employee, (e) => e.cashFlow, {
    eager: true,
  })
  employee: Employee;

  @ManyToOne(() => Category, (e) => e.cashFlows, {
    eager: true,
  })
  category: Category;

  // @ManyToOne(() => Category, (e) => e.cashFlows, {
  //   eager: true,
  // })
  // toCategory: Category;

  @BeforeInsert()
  async generateInvoice() {
    const date = new Date(this.date);
    this.code = this.code + 1;
    this.cashFlowNumber = `CF-${date.getFullYear()}${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${this.code}`;
  }
}
