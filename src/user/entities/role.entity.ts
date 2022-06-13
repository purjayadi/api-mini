import { BaseColumn } from "src/utils/base.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RolePermission } from "./rolePermission.entity";
import { User } from "./user.entity";

@Entity()
export class Role extends BaseColumn {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToOne(() => User, (u) => u.role, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    user: User[];

    @OneToMany(() => RolePermission, (rp) => rp.role, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    permission: RolePermission[];
}
