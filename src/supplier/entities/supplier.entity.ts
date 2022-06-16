import { PurchaseOrder } from './../../purchase/entities/purchase.entity';
import { Product } from './../../product/entities/product.entity';
import { BaseColumn } from 'src/utils/base.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SupplierBankAccount } from '../../supplierAccount/entities/supplierBankAccount.entity';

@Entity()
export class Supplier extends BaseColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  website: string;

  @OneToMany(() => SupplierBankAccount, (s) => s.supplier, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    cascade: true,
    eager: true,
  })
  supplierBankAccount: SupplierBankAccount;

  @OneToMany(() => Product, (p) => p.supplier, {
    onUpdate: 'CASCADE',
  })
  products: Product[];

  @OneToMany(() => PurchaseOrder, (p) => p.supplier, {
    onUpdate: 'CASCADE',
  })
  purchases: PurchaseOrder[];
}
