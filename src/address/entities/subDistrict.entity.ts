import { Customer } from './../../customer/entities/customer.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { District } from './district.entity';

@Entity()
export class SubDistrict {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string

    @Column({
        select: false
    })
    districtId: number

    @ManyToOne(() => District, (sub) => sub.subDistricts, {
        onUpdate: 'CASCADE'
    })
    district: District

    @OneToMany(() => Customer, u => u.subDistrict)
    customer: Customer[];
}
