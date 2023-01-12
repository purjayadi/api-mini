import { FilterDto } from './../dto/filters.dto';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { ReturPurchaseService } from './returPurchase.service';
import { CreateReturPurchaseDto, UpdateReturPurchaseDTO } from './returPurchase.dto';
export declare class ReturPurchaseController {
    private readonly service;
    constructor(service: ReturPurchaseService);
    findAll(payload: FilterDto): Promise<IResponse | IPaginate>;
    create(payload: CreateReturPurchaseDto): Promise<IResponse>;
    findOne(id: string): Promise<IResponse>;
    update(id: string, payload: UpdateReturPurchaseDTO): Promise<IResponse>;
    remove(id: string): Promise<IResponse>;
}
