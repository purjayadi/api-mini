import { BaseColumn } from "src/utils/base.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./permission.entity";
import { Role } from "./role.entity";

@Entity()
export class RolePermission extends BaseColumn {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    roleId: string;

    @Column()
    permissionId: string;

    @ManyToMany(() => Permission, (p) => p.role, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    permission: Permission[];

    @ManyToMany(() => Role, (r) => r.permission, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        cascade: true,
        eager: true,
    })
    role: Role[];
}
