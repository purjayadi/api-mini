import { CreateKasDto, UpdateKasDto } from './../dto/accounting.dto';
import { Repository } from 'typeorm';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { Kas } from './entities/kas.entity';
import { FilterDto } from 'src/dto/filters.dto';
export declare class AccountingService {
    private readonly repository;
    constructor(repository: Repository<Kas>);
    findAll(payload: FilterDto): Promise<IResponse | IPaginate>;
    create(payload: CreateKasDto): Promise<IResponse>;
    findOne(id: string): Promise<IResponse>;
    update(id: string, payload: UpdateKasDto): Promise<IResponse>;
    remove(id: string): Promise<IResponse>;
}
