import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  Controller,
  Delete,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { FilesService } from './file.service';

@Controller('upload')
export class FileController {
  constructor(private readonly fileService: FilesService) {}

  @Post('file')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.uploadPublicFile(
      file.buffer,
      file.originalname,
      file.mimetype,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('file/:id')
  remove(@Param('id') id: string) {
    return this.fileService.deletePublicFile(id);
  }
}
