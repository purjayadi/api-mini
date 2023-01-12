import { Repository } from 'typeorm';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { FindEmployeeDto } from './dto/find-employee.dto';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';
export declare class EmployeeService {
    private readonly repository;
    constructor(repository: Repository<Employee>);
    findAll(payload: FindEmployeeDto): Promise<IResponse | IPaginate>;
    create(payload: CreateEmployeeDto): Promise<IResponse>;
    findOne(id: string): Promise<IResponse>;
    update(id: string, payload: UpdateEmployeeDto): Promise<IResponse>;
    remove(id: string): Promise<IResponse>;
}
