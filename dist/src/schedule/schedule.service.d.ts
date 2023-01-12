import { FilterDto } from './../dto/filters.dto';
import { ScheduleDetail } from './entities/scheduleDetail.entity';
import { Schedule } from './entities/schedule.entity';
import { Repository } from 'typeorm';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { CreateScheduleDto, UpdateScheduleDto } from './schedule.dto';
export declare class ScheduleService {
    private readonly repository;
    private readonly scheduleDetail;
    constructor(repository: Repository<Schedule>, scheduleDetail: Repository<ScheduleDetail>);
    findAll(payload: FilterDto): Promise<IResponse | IPaginate>;
    create(payload: CreateScheduleDto): Promise<IResponse>;
    findOne(id: string): Promise<IResponse>;
    update(id: string, payload: UpdateScheduleDto): Promise<IResponse>;
    remove(id: string): Promise<IResponse>;
}
