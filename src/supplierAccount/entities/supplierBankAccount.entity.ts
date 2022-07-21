import { BaseColumn } from 'src/utils/base.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Supplier } from '../../supplier/entities/supplier.entity';

@Entity()
export class SupplierBankAccount extends BaseColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    select: false,
  })
  supplierId: string;

  @Column()
  code: number;

  @Column()
  accountNumber: number;

  @Column()
  name: string;
}
