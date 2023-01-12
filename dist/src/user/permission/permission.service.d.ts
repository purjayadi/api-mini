import { HttpStatus } from '@nestjs/common';
import { IResponse } from 'src/utils/interfaces/response.interface';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from '../dto/permission.dto';
import { Permission } from '../entities/permission.entity';
export declare class PermissionService {
    private repository;
    constructor(repository: Repository<Permission>);
    findAll(payload: any): Promise<{
        data: Permission[];
        error: any;
        status: HttpStatus;
        message?: undefined;
    } | {
        message: string;
        error: any;
        status: HttpStatus;
        data?: undefined;
    }>;
    create(payload: CreatePermissionDto): Promise<IResponse>;
    findOne(id: string): Promise<{
        data: Permission;
        error: any;
        status: HttpStatus;
        message?: undefined;
    } | {
        message: string;
        error: any;
        status: HttpStatus;
        data?: undefined;
    }>;
    update(id: string, payload: any): Promise<{
        data: any;
        error: string[];
        status: HttpStatus;
        message?: undefined;
    } | {
        message: string;
        error: any;
        status: HttpStatus;
        data?: undefined;
    }>;
    remove(id: string): Promise<{
        data: any;
        error: string[];
        status: HttpStatus;
        message?: undefined;
    } | {
        message: string;
        error: any;
        status: HttpStatus;
        data?: undefined;
    }>;
}
