import { RolePermissionModule } from './../rolePermission/rolePermission.module';
import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { roleProviders } from './role.provider';

@Module({
  imports: [DatabaseModule, RolePermissionModule],
  controllers: [RoleController],
  providers: [...roleProviders, RoleService],
  exports: [RoleService],
})
export class RoleModule {}
