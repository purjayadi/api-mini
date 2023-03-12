import { ResourceService } from './resource.service';
export declare class ResourceController {
    private readonly service;
    constructor(service: ResourceService);
    findAll(payload: any): Promise<{
        data: import("../entities/resource.entity").Resource[];
        error: any;
        status: import("@nestjs/common").HttpStatus;
        message?: undefined;
    } | {
        message: string;
        error: any;
        status: import("@nestjs/common").HttpStatus;
        data?: undefined;
    }>;
}
