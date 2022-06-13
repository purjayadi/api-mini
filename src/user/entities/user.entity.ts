import { BaseColumn } from "src/utils/base.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import * as bcrypt from 'bcrypt';

@Entity()
export class User extends BaseColumn {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true
    })
    username: string;

    @Column({
        select: true
    })
    password: string;

    @Column()
    employeeId: string;

    @Column({
        default: true
    })
    isActive: boolean;

    @Column()
    roleId: string;

    @OneToMany(() => Role, (r) => r.user, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        cascade: true,
        eager: true,
    })
    role: Role;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async validatePassword(password: string): Promise<boolean> {
        return bcrypt.compare(password, this.password);
    }

}


