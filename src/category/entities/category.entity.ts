import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { CashFlow } from 'src/accounting/entities/cashFlow.entity';
import { Kas } from 'src/accounting/entities/kas.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Product, (p) => p.category)
  products: Product[];

  @OneToMany(() => CashFlow, (c) => c.category)
  cashFlows: CashFlow[];

  @OneToMany(() => Kas, (c) => c.category)
  kas: CashFlow[];
}
