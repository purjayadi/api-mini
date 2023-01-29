import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FilesService } from './file.service';

@Module({
  imports: [AuthModule],
  controllers: [FileController],
  providers: [FilesService],
})
export class FileModule {}
