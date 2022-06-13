import { Customer } from './../../customer/entities/customer.entity';
import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { City } from './city.entity';
import { SubDistrict } from './subDistrict.entity';

@Entity()
export class District {
    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string

    @Column({
        select: false
    })
    cityId: number

    @ManyToOne(() => City, (city) => city.districts, {
        onUpdate: 'CASCADE'
    })
    city: City

    @OneToMany(() => SubDistrict, (sub) => sub.district, {
        onUpdate: 'CASCADE',
        cascade: true
    })
    @JoinTable()
    subDistricts: SubDistrict[]

    @OneToMany(() => Customer, u => u.district, {
        onUpdate: 'CASCADE',
        cascade: true
    })
    customer: Customer[];
}
