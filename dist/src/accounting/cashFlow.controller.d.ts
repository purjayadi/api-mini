import { IResponse, IPaginate } from 'src/interface/response.interface';
import { FilterDto } from 'src/dto/filters.dto';
import { CreateCashFlowDto, UpdateCashFlowDto } from 'src/dto/accounting.dto';
import { CashFlowService } from './cashFlow.service';
export declare class CashFlowController {
    private readonly service;
    constructor(service: CashFlowService);
    findAll(payload: FilterDto): Promise<IResponse | IPaginate>;
    create(payload: CreateCashFlowDto): Promise<IResponse>;
    findOne(id: string): Promise<IResponse>;
    findByCode(id: string): Promise<IResponse>;
    update(id: string, payload: UpdateCashFlowDto): Promise<IResponse>;
    remove(id: string): Promise<IResponse>;
}
