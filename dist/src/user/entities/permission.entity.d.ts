import { Resource } from './resource.entity';
import { RolePermission } from './rolePermission.entity';
export declare class Permission {
    id: string;
    action: string;
    resourceId: string;
    resource: Resource;
    rolePermission: RolePermission[];
}
