import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { DatabaseModule } from 'src/database/database.module';
import { permissionProviders } from './permission.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [PermissionController],
  providers: [...permissionProviders, PermissionService],
  exports: [PermissionService],
})
export class PermissionModule {}
