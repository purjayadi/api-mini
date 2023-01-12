import { IResponse, IPaginate } from 'src/interface/response.interface';
import { AccountingService } from './accounting.service';
import { FilterDto } from 'src/dto/filters.dto';
import { CreateKasDto, UpdateKasDto } from 'src/dto/accounting.dto';
export declare class AccountingController {
    private readonly service;
    constructor(service: AccountingService);
    findAll(payload: FilterDto): Promise<IResponse | IPaginate>;
    create(payload: CreateKasDto): Promise<IResponse>;
    findOne(id: string): Promise<IResponse>;
    update(id: string, payload: UpdateKasDto): Promise<IResponse>;
    remove(id: string): Promise<IResponse>;
}
