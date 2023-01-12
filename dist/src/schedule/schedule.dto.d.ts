import { StatusFormat } from './entities/schedule.entity';
export declare class findScheduleDto {
    readonly limit: number;
    readonly offset: number;
    readonly status: StatusFormat;
    readonly date: Date;
}
export declare class CreateScheduleDto {
    readonly date?: Date;
    readonly customerId?: string;
    readonly employeeId?: string;
    readonly description?: string;
    readonly status?: StatusFormat;
    readonly scheduleDetails?: any;
}
export declare class ScheduleDetailDto {
    readonly scheduleId?: string;
    readonly productId?: string;
    readonly unitId?: string;
    readonly quantity?: number;
}
declare const UpdateScheduleDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateScheduleDto>>;
export declare class UpdateScheduleDto extends UpdateScheduleDto_base {
}
export {};
