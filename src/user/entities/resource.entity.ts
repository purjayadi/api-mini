import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Permission } from './permission.entity';

@Entity()
export class Resource {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Permission, (u) => u.resource, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  permissions: Permission[];
}
