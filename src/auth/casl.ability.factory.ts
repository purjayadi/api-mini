import { User } from './../user/entities/user.entity';
import { Ability } from '@casl/ability';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
export enum PermissionAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}
export type PermissionObjectType = any;
export type AppAbility = Ability<[PermissionAction, PermissionObjectType]>;
interface CaslPermission {
  action: PermissionAction;
  subject: string;
}
@Injectable()
export class CaslAbilityFactory {
  constructor(private authService: AuthService) {}
  async createForUser(user: string): Promise<AppAbility> {
    const dbPermissions: User = await this.authService.checkAllPermission(user);
    if (!dbPermissions) {
      throw new UnauthorizedException();
    }
    const caslPermissions: CaslPermission[] =
      dbPermissions.role?.rolePermissions.map((p) => ({
        action: p.permission.action as PermissionAction,
        subject: p.permission.resource.name,
      }));
    return new Ability<[PermissionAction, PermissionObjectType]>(
      caslPermissions,
    );
  }
}
