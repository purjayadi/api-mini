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
exports.Permission = void 0;
const typeorm_1 = require("typeorm");
const resource_entity_1 = require("./resource.entity");
const rolePermission_entity_1 = require("./rolePermission.entity");
let Permission = class Permission {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Permission.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Permission.prototype, "action", void 0);
__decorate([
    (0, typeorm_1.Column)({
        select: false,
    }),
    __metadata("design:type", String)
], Permission.prototype, "resourceId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => resource_entity_1.Resource, (r) => r.permissions, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        eager: true,
    }),
    __metadata("design:type", resource_entity_1.Resource)
], Permission.prototype, "resource", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rolePermission_entity_1.RolePermission, (rp) => rp.permission, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Permission.prototype, "rolePermission", void 0);
Permission = __decorate([
    (0, typeorm_1.Entity)()
], Permission);
exports.Permission = Permission;
//# sourceMappingURL=permission.entity.js.map