import { CaslAbilityFactory } from './casl.ability.factory';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
declare const PermissionsGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class PermissionsGuard extends PermissionsGuard_base implements CanActivate {
    private reflector;
    private abilityFactory;
    constructor(reflector: Reflector, abilityFactory: CaslAbilityFactory);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private isAllowed;
}
export {};
