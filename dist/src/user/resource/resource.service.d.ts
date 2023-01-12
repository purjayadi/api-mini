import { Resource } from './../entities/resource.entity';
import { HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
export declare class ResourceService {
    private repository;
    constructor(repository: Repository<Resource>);
    findAll(payload: any): Promise<{
        data: Resource[];
        error: any;
        status: HttpStatus;
        message?: undefined;
    } | {
        message: string;
        error: any;
        status: HttpStatus;
        data?: undefined;
    }>;
}
