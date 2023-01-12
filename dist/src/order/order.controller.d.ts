import { FilterDto } from './../dto/filters.dto';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { CreateOrderDto, UpdateOrderDto } from './order.dto';
import { OrderService } from './order.service';
export declare class OrderController {
    private readonly service;
    constructor(service: OrderService);
    findAll(payload: FilterDto): Promise<IResponse | IPaginate>;
    create(payload: CreateOrderDto): Promise<IResponse>;
    findOne(id: string): Promise<IResponse>;
    update(id: string, payload: UpdateOrderDto): Promise<IResponse>;
    remove(id: string): Promise<IResponse>;
    softRemove(id: string): Promise<IResponse>;
    restoreOrder(id: string): Promise<IResponse>;
}
