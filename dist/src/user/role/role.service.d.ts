import { DataSource, Repository } from 'typeorm';
import { HttpStatus } from '@nestjs/common';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { AssignPermission } from '../dto/role.dto';
import { Role } from '../entities/role.entity';
import { RolePermission } from '../entities/rolePermission.entity';
export declare class RoleService {
    private readonly repository;
    private readonly rolePermission;
    private readonly connection;
    constructor(repository: Repository<Role>, rolePermission: Repository<RolePermission>, connection: DataSource);
    findAll(payload: any): Promise<IResponse | IPaginate>;
    create(payload: any): Promise<{
        message: string;
        error: any;
        status: HttpStatus;
    }>;
    findOne(id: string): Promise<{
        data: Role;
        error: any;
        status: HttpStatus;
    }>;
    update(id: string, payload: any): Promise<{
        message: string;
        error: any;
        status: HttpStatus;
    }>;
    remove(id: string): Promise<{
        message: string;
        error: any;
        status: HttpStatus;
    }>;
    assignPermission(id: string, payload: AssignPermission): Promise<IResponse>;
}
