"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionModule = void 0;
const database_module_1 = require("../../database/database.module");
const common_1 = require("@nestjs/common");
const rolePermission_provider_1 = require("./rolePermission.provider");
let RolePermissionModule = class RolePermissionModule {
};
RolePermissionModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        providers: [...rolePermission_provider_1.rolePermissionProviders],
        exports: [...rolePermission_provider_1.rolePermissionProviders],
    })
], RolePermissionModule);
exports.RolePermissionModule = RolePermissionModule;
//# sourceMappingURL=rolePermission.module.js.map