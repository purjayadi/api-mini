"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const aws_sdk_1 = require("aws-sdk");
const config_1 = require("@nestjs/config");
const uuid_1 = require("uuid");
let FilesService = class FilesService {
    constructor(configService) {
        this.configService = configService;
    }
    async uploadPublicFile(dataBuffer, filename, mimetype) {
        const s3 = new aws_sdk_1.S3();
        try {
            const uploadResult = await s3
                .upload({
                Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
                Body: dataBuffer,
                ContentType: mimetype,
                Key: `${(0, uuid_1.v4)()}-${filename}`,
            })
                .promise();
            return {
                message: 'Upload file successfully',
                result: uploadResult,
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deletePublicFile(fileId) {
        const s3 = new aws_sdk_1.S3();
        try {
            await s3
                .deleteObject({
                Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
                Key: fileId,
            })
                .promise();
            return {
                message: 'Delete file successfully',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
FilesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FilesService);
exports.FilesService = FilesService;
//# sourceMappingURL=file.service.js.map