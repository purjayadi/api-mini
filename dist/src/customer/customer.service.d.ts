import { FilterDto } from './../dto/filters.dto';
import { Repository } from 'typeorm';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
export declare class CustomerService {
    private readonly repository;
    constructor(repository: Repository<Customer>);
    findAll(payload: FilterDto): Promise<IResponse | IPaginate>;
    create(payload: CreateCustomerDto): Promise<IResponse>;
    findOne(id: string): Promise<IResponse>;
    update(id: string, payload: UpdateCustomerDto): Promise<IResponse>;
    delete(id: string): Promise<IResponse>;
}
