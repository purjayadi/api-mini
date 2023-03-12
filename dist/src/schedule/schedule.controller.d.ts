import { FilterDto } from './../dto/filters.dto';
import { ScheduleService } from './schedule.service';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { CreateScheduleDto, UpdateScheduleDto } from './schedule.dto';
export declare class ScheduleController {
    private readonly service;
    constructor(service: ScheduleService);
    create(payload: CreateScheduleDto): Promise<IResponse>;
    findAll(payload: FilterDto): Promise<IResponse | IPaginate>;
    findOne(id: string): Promise<IResponse>;
    update(id: string, payload: UpdateScheduleDto): Promise<IResponse>;
    remove(id: string): Promise<IResponse>;
}
