import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Resource } from './resource.entity';
import { RolePermission } from './rolePermission.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  action: string;

  @Column({
    select: false,
  })
  resourceId: string;

  @ManyToOne(() => Resource, (r) => r.permissions, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    eager: true,
  })
  resource: Resource;

  @OneToMany(() => RolePermission, (rp) => rp.permission, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  rolePermission: RolePermission[];
}
