import { HttpStatus } from '@nestjs/common';
import { DataSource } from 'typeorm';
export declare class DatabaseService {
    private readonly connection;
    constructor(connection: DataSource);
    preProduction(): Promise<{
        message: string;
        error: any;
        status: HttpStatus;
    }>;
}
