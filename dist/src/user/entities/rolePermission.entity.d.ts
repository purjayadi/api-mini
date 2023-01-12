import { Permission } from './permission.entity';
import { Role } from './role.entity';
export declare class RolePermission {
    id: string;
    roleId: string;
    permissionId: string;
    permission: Permission;
    role: Role;
}
