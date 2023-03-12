import { Category } from 'src/category/entities/category.entity';
import { BaseColumn } from 'src/utils/base.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Kas extends BaseColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  date: Date;

  @Column()
  source: string;

  @Column()
  categoryId: string;

  @Column({
    type: 'decimal',
  })
  debit: number;

  @Column({
    type: 'decimal',
  })
  credit: number;

  @Column()
  description: string;

  @ManyToOne(() => Category, (e) => e.kas, {
    eager: true,
  })
  category: Category;
}
