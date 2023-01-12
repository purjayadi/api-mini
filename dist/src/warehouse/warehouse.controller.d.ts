import { FindDto } from './../utils/dto/find.dto';
import { WarehouseService } from './warehouse.service';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
export declare class WarehouseController {
    private readonly service;
    constructor(service: WarehouseService);
    create(payload: CreateWarehouseDto): Promise<IResponse>;
    findAll(payload: FindDto): Promise<IResponse | IPaginate>;
    findOne(id: string): Promise<IResponse>;
    update(id: string, payload: UpdateWarehouseDto): Promise<IResponse>;
    remove(id: string): Promise<IResponse>;
}
