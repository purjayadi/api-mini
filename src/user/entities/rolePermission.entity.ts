import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Permission } from './permission.entity';
import { Role } from './role.entity';

@Entity()
export class RolePermission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    select: false,
  })
  roleId: string;

  @Column({
    select: false,
  })
  permissionId: string;

  @ManyToOne(() => Permission, (p) => p.rolePermission, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    eager: true,
  })
  permission: Permission;

  @ManyToOne(() => Role, (r) => r.rolePermissions, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  role: Role;
}
