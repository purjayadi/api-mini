import { RolePermission } from './../user/entities/rolePermission.entity';
import { Permission } from './../user/entities/permission.entity';
import { Role } from './../user/entities/role.entity';
import { User } from './../user/entities/user.entity';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepositoryInterface, UserRepositoryInterface, PermissionRepositoryInterface, RolePermissionRepositoryInterface } from './interface/user.repository.interface';

@Injectable()
export class UserRepository extends BaseAbstractRepository<User> implements UserRepositoryInterface {

    constructor(@InjectRepository(User)
    private readonly userRepository: Repository<User>,
    ) {
        super(userRepository);
    }
}

// role
@Injectable()
export class RoleRepository extends BaseAbstractRepository<Role> implements RoleRepositoryInterface {

    constructor(@InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    ) {
        super(roleRepository);
    }
}

// permission
@Injectable()
export class PermissionRepository extends BaseAbstractRepository<Permission> implements PermissionRepositoryInterface {

    constructor(@InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
    ) {
        super(permissionRepository);
    }
}

// role permission
@Injectable()
export class RolePermissionRepository extends BaseAbstractRepository<RolePermission> implements RolePermissionRepositoryInterface {

    constructor(@InjectRepository(RolePermission)
    private readonly rolePermissionRepository: Repository<RolePermission>,
    ) {
        super(rolePermissionRepository);
    }
}
