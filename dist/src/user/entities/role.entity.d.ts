import { RolePermission } from './rolePermission.entity';
import { User } from './user.entity';
export declare class Role {
    id: string;
    name: string;
    user: User[];
    rolePermissions: RolePermission[];
}
