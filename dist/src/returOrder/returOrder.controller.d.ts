import { FilterDto } from './../dto/filters.dto';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { ReturOrderService } from './returOrder.service';
import { CreateReturOrderDTO, UpdateReturOrderDTO } from './returOrder.dto';
export declare class ReturOrderController {
    private readonly service;
    constructor(service: ReturOrderService);
    findAll(payload: FilterDto): Promise<IResponse | IPaginate>;
    create(payload: CreateReturOrderDTO): Promise<IResponse>;
    findOne(id: string): Promise<IResponse>;
    update(id: string, payload: UpdateReturOrderDTO): Promise<IResponse>;
    remove(id: string): Promise<IResponse>;
}
