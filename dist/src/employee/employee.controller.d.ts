import { IResponse, IPaginate } from 'src/interface/response.interface';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FindEmployeeDto } from './dto/find-employee.dto';
export declare class EmployeeController {
    private readonly service;
    constructor(service: EmployeeService);
    findAll(payload: FindEmployeeDto): Promise<IResponse | IPaginate>;
    create(payload: CreateEmployeeDto): Promise<IResponse>;
    findOne(id: string): Promise<IResponse>;
    update(id: string, updateEmployeeDto: UpdateEmployeeDto): Promise<IResponse>;
    remove(id: string): Promise<IResponse>;
}
