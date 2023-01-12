import { DatabaseService } from './database.service';
export declare class DatabaseController {
    private readonly service;
    constructor(service: DatabaseService);
    preProduction(): Promise<{
        message: string;
        error: any;
        status: import("@nestjs/common").HttpStatus;
    }>;
}
