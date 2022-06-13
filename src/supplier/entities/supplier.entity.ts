import { Product } from './../../product/entities/product.entity';
import { BaseColumn } from "src/utils/base.entity";
import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SupplierBankAccount } from "./supplierBankAccount.entity";

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
    @JoinTable()
    supplierBankAccount: SupplierBankAccount;

    @OneToMany(() => Product, (p) => p.supplier, {
        onUpdate: 'CASCADE'
    })
    @JoinTable()
    products: Product[];
}
