import { Repository } from 'typeorm';
import { FindDto } from './../utils/dto/find.dto';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Warehouse } from './entities/warehouse.entity';
import { IResponse, IPaginate } from 'src/interface/response.interface';
export declare class WarehouseService {
    private readonly repository;
    constructor(repository: Repository<Warehouse>);
    findAll(payload: FindDto): Promise<IResponse | IPaginate>;
    create(payload: CreateWarehouseDto): Promise<IResponse>;
    findOne(id: string): Promise<IResponse>;
    update(id: string, payload: UpdateWarehouseDto): Promise<IResponse>;
    remove(id: string): Promise<IResponse>;
}
