import { Repository } from 'typeorm';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { FindSupplierDto } from './dto/find-supplier.dto';
import { Supplier } from './entities/supplier.entity';
import { IResponse, IPaginate } from '../interface/response.interface';
export declare class SupplierService {
    private readonly repository;
    constructor(repository: Repository<Supplier>);
    findAll(payload: FindSupplierDto): Promise<IResponse | IPaginate>;
    create(payload: CreateSupplierDto): Promise<IResponse>;
    findOne(id: string): Promise<IResponse>;
    update(id: string, payload: UpdateSupplierDto): Promise<IResponse>;
    remove(id: string): Promise<IResponse>;
}
