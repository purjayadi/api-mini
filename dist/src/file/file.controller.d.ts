/// <reference types="multer" />
import { FilesService } from './file.service';
export declare class FileController {
    private readonly fileService;
    constructor(fileService: FilesService);
    upload(file: Express.Multer.File): Promise<{
        message: string;
        result: import("aws-sdk/clients/s3").ManagedUpload.SendData;
        error: any;
        status: import("@nestjs/common").HttpStatus;
    }>;
    remove(id: string): Promise<{
        message: string;
        error: any;
        status: import("@nestjs/common").HttpStatus;
    }>;
}
