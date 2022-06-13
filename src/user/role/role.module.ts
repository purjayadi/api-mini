import { RoleRepository } from './../../repository/user.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../entities/role.entity';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Role])],
    controllers: [RoleController],
    providers: [
        {
            provide: 'RoleRepositoryInterface',
            useClass: RoleRepository,
        },
        RoleService
    ],
    exports: [RoleService]
})
export class RoleModule { }
