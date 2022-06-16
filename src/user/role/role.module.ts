import {
  RolePermissionRepository,
  RoleRepository,
} from './../../repository/user.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RolePermission } from '../entities/rolePermission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, RolePermission])],
  controllers: [RoleController],
  providers: [
    {
      provide: 'RoleRepositoryInterface',
      useClass: RoleRepository,
    },
    {
      provide: 'RolePermissionRepositoryInterface',
      useClass: RolePermissionRepository,
    },
    RoleService,
  ],
  exports: [RoleService],
})
export class RoleModule {}
