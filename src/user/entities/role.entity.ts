import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RolePermission } from './rolePermission.entity';
import { User } from './user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => User, (u) => u.role, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  user: User[];

  @OneToMany(() => RolePermission, (rp) => rp.role, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
    cascade: true,
    eager: true,
  })
  rolePermissions: RolePermission[];
}
