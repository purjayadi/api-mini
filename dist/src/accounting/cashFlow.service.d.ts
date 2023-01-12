import { CreateCashFlowDto, UpdateCashFlowDto } from './../dto/accounting.dto';
import { Repository } from 'typeorm';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { CashFlow } from './entities/cashFlow.entity';
import { FilterDto } from 'src/dto/filters.dto';
import { Kas } from './entities/kas.entity';
export declare class CashFlowService {
    private readonly repository;
    private readonly kas;
    constructor(repository: Repository<CashFlow>, kas: Repository<Kas>);
    findAll(payload: FilterDto): Promise<IResponse | IPaginate>;
    create(payload: CreateCashFlowDto): Promise<IResponse>;
    findOne(id: string): Promise<IResponse>;
    findCashFlowByCode(code: string): Promise<IResponse>;
    update(id: string, payload: UpdateCashFlowDto): Promise<IResponse>;
    remove(id: string): Promise<IResponse>;
}
