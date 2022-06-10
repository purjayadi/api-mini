import { BaseColumn } from "src/constant/base.entity";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export enum GenderFormat {
    MALE = 'male',
    FEMALE = 'female'
}

export enum StatusFormat {
    MARRIED = 'married',
    SINGLE = 'single'
}

export class Employee extends BaseColumn {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    code: string

    @Column()
    name: string

    @Column()
    phone: string

    @Column({
        type: 'enum',
        enum: GenderFormat,
        default: GenderFormat.MALE
    })
    gender: GenderFormat

    @Column({
        default: () => 'employee.jpg'
    })
    photo: string

    @Column()
    joinDate: Date

    @Column({
        type: 'enum',
        enum: StatusFormat,
        default: StatusFormat.SINGLE
    })
    status: StatusFormat

    @Column()
    isActive: boolean

}
