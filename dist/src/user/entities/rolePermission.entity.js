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
exports.RolePermission = void 0;
const typeorm_1 = require("typeorm");
const permission_entity_1 = require("./permission.entity");
const role_entity_1 = require("./role.entity");
let RolePermission = class RolePermission {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], RolePermission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RolePermission.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], RolePermission.prototype, "permissionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => permission_entity_1.Permission, (p) => p.rolePermission, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        eager: true,
    }),
    __metadata("design:type", permission_entity_1.Permission)
], RolePermission.prototype, "permission", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => role_entity_1.Role, (r) => r.rolePermissions, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", role_entity_1.Role)
], RolePermission.prototype, "role", void 0);
RolePermission = __decorate([
    (0, typeorm_1.Entity)()
], RolePermission);
exports.RolePermission = RolePermission;
//# sourceMappingURL=rolePermission.entity.js.map