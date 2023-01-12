import { FilterDto } from './../dto/filters.dto';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    create(createCustomerDto: CreateCustomerDto): Promise<IResponse>;
    findAll(payload: FilterDto): Promise<IResponse | IPaginate>;
    findOne(id: string): Promise<IResponse>;
    update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<IResponse>;
    remove(id: string): Promise<IResponse>;
}
