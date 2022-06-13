import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Resource } from "./resource.entity";
import { Role } from "./role.entity";
import { RolePermission } from "./rolePermission.entity";

@Entity()
export class Permission {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    action: string;

    @Column()
    resourceId: string;

    @OneToMany(() => Resource, (r) => r.permissions, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    resource: Resource;

    @ManyToOne(() => RolePermission, (rp) => rp.permission, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        cascade: true,
        eager: true,
    })
    role: Role;
}
