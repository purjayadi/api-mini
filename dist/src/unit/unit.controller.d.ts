import { IResponse, IPaginate } from 'src/interface/response.interface';
import { CreateUnitDto, FindUnitDto } from '../product/dto/unit.dto';
import { UnitService } from './unit.service';
export declare class UnitController {
    private readonly service;
    constructor(service: UnitService);
    create(payload: CreateUnitDto): Promise<IResponse>;
    findAll(payload: FindUnitDto): Promise<IResponse | IPaginate>;
    findOne(id: string): Promise<IResponse>;
    update(id: string, payload: Partial<CreateUnitDto>): Promise<IResponse>;
    remove(id: string): Promise<IResponse>;
}
