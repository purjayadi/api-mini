import { PermissionRepository } from './../../repository/user.repository';
import { Permission } from './../entities/permission.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Permission])],
    controllers: [PermissionController],
    providers: [
        {
            provide: 'PermissionRepositoryInterface',
            useClass: PermissionRepository,
        },
        PermissionService
    ],
    exports: [PermissionService]
})
export class PermissionModule { }
