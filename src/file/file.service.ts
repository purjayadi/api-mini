import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

@Injectable()
export class FilesService {
  constructor(private readonly configService: ConfigService) {}

  async uploadPublicFile(
    dataBuffer: Buffer,
    filename: string,
    mimetype: string,
  ) {
    const s3 = new S3();
    try {
      const uploadResult = await s3
        .upload({
          Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
          Body: dataBuffer,
          ContentType: mimetype,
          Key: `${uuid()}-${filename}`,
        })
        .promise();
      return {
        message: 'Upload file successfully',
        result: uploadResult,
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deletePublicFile(fileId: string) {
    const s3 = new S3();
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
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
