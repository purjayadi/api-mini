import { PurchaseOrder } from './../../purchase/entities/purchase.entity';
import { Employee } from './../../employee/entities/employee.entity';
import { BaseColumn } from 'src/utils/base.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from './role.entity';
import * as bcrypt from 'bcrypt';
import { ReturPurchase } from 'src/returPurchase/entities/returPurchase.entity';

@Entity()
export class User extends BaseColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @Column({
    select: false,
    nullable: true,
  })
  employeeId: string;

  @Column({
    default: true,
  })
  isActive: boolean;

  @Column({
    select: false,
  })
  roleId: string;

  @ManyToOne(() => Role, (r) => r.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    eager: true,
  })
  role: Role;

  @OneToMany(() => PurchaseOrder, (p) => p.user, {
    onDelete: 'SET NULL',
  })
  purchases: PurchaseOrder[];

  @OneToOne(() => Employee, (e) => e.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  employee: Employee;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @OneToMany(() => ReturPurchase, (rp) => rp.user, {
    onUpdate: 'CASCADE',
  })
  returPurchases: ReturPurchase[];
}
