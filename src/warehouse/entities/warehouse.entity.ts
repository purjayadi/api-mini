import { Product } from './../../product/entities/product.entity';
import { BaseColumn } from 'src/utils/base.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Warehouse extends BaseColumn {
    // entity warehouse
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    phone: string;

    @ManyToMany(() => Product, (p) => p.warehouses, {
        onUpdate: 'CASCADE'
    })
    @JoinTable()
    products: Product[];
}
