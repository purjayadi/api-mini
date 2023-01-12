/// <reference types="node" />
import { HttpStatus } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
export declare class FilesService {
    private readonly configService;
    constructor(configService: ConfigService);
    uploadPublicFile(dataBuffer: Buffer, filename: string, mimetype: string): Promise<{
        message: string;
        result: S3.ManagedUpload.SendData;
        error: any;
        status: HttpStatus;
    }>;
    deletePublicFile(fileId: string): Promise<{
        message: string;
        error: any;
        status: HttpStatus;
    }>;
}
