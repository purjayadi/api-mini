"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsGuard = void 0;
const casl_ability_factory_1 = require("./casl.ability.factory");
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const permission_decorator_1 = require("./permission.decorator");
const passport_1 = require("@nestjs/passport");
let PermissionsGuard = class PermissionsGuard extends (0, passport_1.AuthGuard)('jwt') {
    constructor(reflector, abilityFactory) {
        super();
        this.reflector = reflector;
        this.abilityFactory = abilityFactory;
    }
    async canActivate(context) {
        const requiredPermissions = this.reflector.get(permission_decorator_1.PERMISSION_CHECKER_KEY, context.getHandler()) || [];
        const { user } = context.switchToHttp().getRequest();
        if (!user) {
            throw new common_1.UnauthorizedException();
        }
        const ability = await this.abilityFactory.createForUser(user.id);
        return requiredPermissions.every((permission) => this.isAllowed(ability, permission));
    }
    isAllowed(ability, permission) {
        return ability.can(...permission);
    }
};
PermissionsGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        casl_ability_factory_1.CaslAbilityFactory])
], PermissionsGuard);
exports.PermissionsGuard = PermissionsGuard;
//# sourceMappingURL=permission.guard.js.map