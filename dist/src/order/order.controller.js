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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const filters_dto_1 = require("./../dto/filters.dto");
const common_1 = require("@nestjs/common");
const casl_ability_factory_1 = require("../auth/casl.ability.factory");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permission_decorator_1 = require("../auth/permission.decorator");
const permission_guard_1 = require("../auth/permission.guard");
const order_dto_1 = require("./order.dto");
const order_service_1 = require("./order.service");
let OrderController = class OrderController {
    constructor(service) {
        this.service = service;
    }
    findAll(payload) {
        return this.service.findAll(payload);
    }
    create(payload) {
        return this.service.create(payload);
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    update(id, payload) {
        return this.service.update(id, payload);
    }
    remove(id) {
        return this.service.remove(id);
    }
    softRemove(id) {
        return this.service.softDelete(id);
    }
    restoreOrder(id) {
        return this.service.restoreSoftDelete(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionsGuard),
    (0, permission_decorator_1.CheckPermissions)([casl_ability_factory_1.PermissionAction.READ, 'Order']),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filters_dto_1.FilterDto]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionsGuard),
    (0, permission_decorator_1.CheckPermissions)([casl_ability_factory_1.PermissionAction.CREATE, 'Order']),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionsGuard),
    (0, permission_decorator_1.CheckPermissions)([casl_ability_factory_1.PermissionAction.READ, 'Order']),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionsGuard),
    (0, permission_decorator_1.CheckPermissions)([casl_ability_factory_1.PermissionAction.UPDATE, 'Order']),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, order_dto_1.UpdateOrderDto]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionsGuard),
    (0, permission_decorator_1.CheckPermissions)([casl_ability_factory_1.PermissionAction.DELETE, 'Order']),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "remove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionsGuard),
    (0, permission_decorator_1.CheckPermissions)([casl_ability_factory_1.PermissionAction.DELETE, 'Order']),
    (0, common_1.Delete)('soft-remove/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "softRemove", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionsGuard),
    (0, permission_decorator_1.CheckPermissions)([casl_ability_factory_1.PermissionAction.DELETE, 'Order']),
    (0, common_1.Put)('restore/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "restoreOrder", null);
OrderController = __decorate([
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map