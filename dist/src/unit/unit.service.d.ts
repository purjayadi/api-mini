import { Repository } from 'typeorm';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { CreateUnitDto, FindUnitDto } from '../product/dto/unit.dto';
import { Unit } from './entities/unit.entity';
export declare class UnitService {
    private readonly repository;
    constructor(repository: Repository<Unit>);
    findAll(payload: FindUnitDto): Promise<IResponse | IPaginate>;
    create(payload: CreateUnitDto): Promise<IResponse>;
    findOne(id: string): Promise<IResponse>;
    update(id: string, payload: Partial<CreateUnitDto>): Promise<IResponse>;
    remove(id: string): Promise<IResponse>;
}
