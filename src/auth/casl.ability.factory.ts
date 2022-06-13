// import { Permission } from './../user/entities/permission.entity';
// import { User } from './../user/entities/user.entity';
// import { Ability } from "@casl/ability";
// import { Injectable } from "@nestjs/common";
// import { AuthService } from "./auth.service";
// export enum PermissionAction {
//     CREATE = "create",
//     READ = "read",
//     UPDATE = "update",
//     DELETE = "delete",
// }
// export type PermissionObjectType = any;
// export type AppAbility = Ability<[PermissionAction, PermissionObjectType]>;
// interface CaslPermission {
//     action: PermissionAction;
//     subject: string;
// }
// @Injectable()
// export class CaslAbilityFactory {
//     constructor(private authService: AuthService) { }
//     async createForUser(user: User): Promise<AppAbility> {
//         // const dbPermissions: Permission[] = await this.authService.findAllPermissionsOfUser(user);
//         // const caslPermissions: CaslPermission[] = dbPermissions.map(p => ({
//         //     action: p.action,
//         //     subject: p.permissionObject.name,
//         // }));
//         // return new Ability<[PermissionAction, PermissionObjectType]>(caslPermissions);
//     }
// }