import { BaseColumn } from 'src/utils/base.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Supplier } from './supplier.entity';

@Entity()
export class SupplierBankAccount extends BaseColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    select: false,
  })
  supplierId: string;

  @Column()
  code: string;

  @Column()
  accountNumber: number;

  @Column()
  name: string;

  @ManyToOne(() => Supplier, (s) => s.supplierBankAccount, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  supplier: Supplier[];
}
