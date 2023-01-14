import { AssignPermission } from './../dto/role.dto';
import { CreateRoleDto } from '../dto/role.dto';
import { RoleService } from './role.service';
export declare class RoleController {
    private readonly service;
    constructor(service: RoleService);
    create(payload: CreateRoleDto): Promise<{
        message: string;
        error: any;
        status: import("@nestjs/common").HttpStatus;
    }>;
    findAll(payload: any): Promise<import("../../interface/response.interface").IResponse | import("../../interface/response.interface").IPaginate>;
    findOne(id: string): Promise<{
        data: import("../entities/role.entity").Role;
        error: any;
        status: import("@nestjs/common").HttpStatus;
    }>;
    update(id: string, updateUserDto: Partial<CreateRoleDto>): Promise<{
        message: string;
        error: any;
        status: import("@nestjs/common").HttpStatus;
    }>;
    remove(id: string): Promise<{
        message: string;
        error: any;
        status: import("@nestjs/common").HttpStatus;
    }>;
    assignPermission(id: string, payload: AssignPermission): Promise<import("../../interface/response.interface").IResponse>;
}
