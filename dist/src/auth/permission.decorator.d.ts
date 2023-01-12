import { PermissionAction, PermissionObjectType } from './casl.ability.factory';
import { CustomDecorator } from '@nestjs/common';
export declare type RequiredPermission = [PermissionAction, PermissionObjectType];
export declare const PERMISSION_CHECKER_KEY = "permission_checker_params_key";
export declare const CheckPermissions: (...params: RequiredPermission[]) => CustomDecorator<string>;
