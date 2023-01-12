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
exports.CaslAbilityFactory = exports.PermissionAction = void 0;
const ability_1 = require("@casl/ability");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
var PermissionAction;
(function (PermissionAction) {
    PermissionAction["CREATE"] = "create";
    PermissionAction["READ"] = "read";
    PermissionAction["UPDATE"] = "update";
    PermissionAction["DELETE"] = "delete";
})(PermissionAction = exports.PermissionAction || (exports.PermissionAction = {}));
let CaslAbilityFactory = class CaslAbilityFactory {
    constructor(authService) {
        this.authService = authService;
    }
    async createForUser(user) {
        var _a;
        const dbPermissions = await this.authService.checkAllPermission(user);
        if (!dbPermissions) {
            throw new common_1.UnauthorizedException();
        }
        const caslPermissions = (_a = dbPermissions.role) === null || _a === void 0 ? void 0 : _a.rolePermissions.map((p) => ({
            action: p.permission.action,
            subject: p.permission.resource.name,
        }));
        return new ability_1.Ability(caslPermissions);
    }
};
CaslAbilityFactory = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], CaslAbilityFactory);
exports.CaslAbilityFactory = CaslAbilityFactory;
//# sourceMappingURL=casl.ability.factory.js.map