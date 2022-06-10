import { BaseColumn } from '../../constant/base.entity';
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Customer extends BaseColumn {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    code: string

    @Column()
    name: string

    @Column()
    shopName: string

    @Column()
    address: Text

    @Column()
    phone: string

    @Column({ default: () => 'toko.jpg' })
    photo: string

    @Column()
    gps: string

    @Column()
    employeeId: string

    @Column()
    joinDate: Date

    @Column()
    districtCode: number

    @Column()
    subDistrictCode: number

    @Column()
    villageCode: number
}
