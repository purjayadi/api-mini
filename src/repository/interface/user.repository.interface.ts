import { RolePermission } from './../../user/entities/rolePermission.entity';
import { Permission } from './../../user/entities/permission.entity';
import { Role } from './../../user/entities/role.entity';
import { User } from './../../user/entities/user.entity';
import { BaseInterfaceRepository } from '../base/base.interface.repository';

export type UserRepositoryInterface = BaseInterfaceRepository<User>;

// role
export type RoleRepositoryInterface = BaseInterfaceRepository<Role>;

// permission
export type PermissionRepositoryInterface = BaseInterfaceRepository<Permission>;

// role permission
export type RolePermissionRepositoryInterface =
  BaseInterfaceRepository<RolePermission>;
