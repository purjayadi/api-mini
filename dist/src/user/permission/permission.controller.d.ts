import { CreatePermissionDto } from '../dto/permission.dto';
import { PermissionService } from './permission.service';
export declare class PermissionController {
    private readonly service;
    constructor(service: PermissionService);
    create(payload: CreatePermissionDto): Promise<import("../../utils/interfaces/response.interface").IResponse>;
    findAll(payload: any): Promise<{
        data: import("../entities/permission.entity").Permission[];
        error: any;
        status: import("@nestjs/common").HttpStatus;
        message?: undefined;
    } | {
        message: string;
        error: any;
        status: import("@nestjs/common").HttpStatus;
        data?: undefined;
    }>;
    findOne(id: string): Promise<{
        data: import("../entities/permission.entity").Permission;
        error: any;
        status: import("@nestjs/common").HttpStatus;
        message?: undefined;
    } | {
        message: string;
        error: any;
        status: import("@nestjs/common").HttpStatus;
        data?: undefined;
    }>;
    update(id: string, updateUserDto: Partial<CreatePermissionDto>): Promise<{
        data: any;
        error: string[];
        status: import("@nestjs/common").HttpStatus;
        message?: undefined;
    } | {
        message: string;
        error: any;
        status: import("@nestjs/common").HttpStatus;
        data?: undefined;
    }>;
    remove(id: string): Promise<{
        data: any;
        error: string[];
        status: import("@nestjs/common").HttpStatus;
        message?: undefined;
    } | {
        message: string;
        error: any;
        status: import("@nestjs/common").HttpStatus;
        data?: undefined;
    }>;
}
