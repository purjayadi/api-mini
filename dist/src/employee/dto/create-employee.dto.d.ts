import { GenderFormat, StatusFormat } from '../entities/employee.entity';
export declare class CreateEmployeeDto {
    readonly name: string;
    readonly email: string;
    readonly phone: string;
    readonly address: string;
    readonly gender: GenderFormat;
    readonly photo: string;
    readonly joinDate: Date;
    readonly status: StatusFormat;
    readonly isActive: boolean;
}
