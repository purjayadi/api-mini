import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';
import { rolePermissionProviders } from './rolePermission.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...rolePermissionProviders],
  exports: [...rolePermissionProviders],
})
export class RolePermissionModule {}
