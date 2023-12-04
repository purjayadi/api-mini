import { Ability } from '@casl/ability';
import { AuthService } from './auth.service';
export declare enum PermissionAction {
    CREATE = "create",
    READ = "read",
    UPDATE = "update",
    DELETE = "delete"
}
export type PermissionObjectType = any;
export type AppAbility = Ability<[PermissionAction, PermissionObjectType]>;
export declare class CaslAbilityFactory {
    private authService;
    constructor(authService: AuthService);
    createForUser(user: string): Promise<AppAbility>;
}
