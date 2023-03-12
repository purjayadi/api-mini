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
exports.PurchaseController = void 0;
const common_1 = require("@nestjs/common");
const purchase_service_1 = require("./purchase.service");
const purchase_dto_1 = require("./purchase.dto");
const casl_ability_factory_1 = require("../auth/casl.ability.factory");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permission_decorator_1 = require("../auth/permission.decorator");
const permission_guard_1 = require("../auth/permission.guard");
let PurchaseController = class PurchaseController {
    constructor(purchaseService) {
        this.purchaseService = purchaseService;
    }
    create(createPurchaseDto) {
        return this.purchaseService.create(createPurchaseDto);
    }
    findAll(payload) {
        return this.purchaseService.findAll(payload);
    }
    findOne(id) {
        return this.purchaseService.findOne(id);
    }
    update(id, payload) {
        return this.purchaseService.update(id, payload);
    }
    remove(id) {
        return this.purchaseService.remove(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionsGuard),
    (0, permission_decorator_1.CheckPermissions)([casl_ability_factory_1.PermissionAction.CREATE, 'Purchase']),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [purchase_dto_1.CreatePurchaseDto]),
    __metadata("design:returntype", void 0)
], PurchaseController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionsGuard),
    (0, permission_decorator_1.CheckPermissions)([casl_ability_factory_1.PermissionAction.READ, 'Purchase']),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [purchase_dto_1.FindPurchaseDto]),
    __metadata("design:returntype", void 0)
], PurchaseController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionsGuard),
    (0, permission_decorator_1.CheckPermissions)([casl_ability_factory_1.PermissionAction.READ, 'Purchase']),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PurchaseController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionsGuard),
    (0, permission_decorator_1.CheckPermissions)([casl_ability_factory_1.PermissionAction.UPDATE, 'Purchase']),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, purchase_dto_1.UpdatePurchaseDto]),
    __metadata("design:returntype", void 0)
], PurchaseController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionsGuard),
    (0, permission_decorator_1.CheckPermissions)([casl_ability_factory_1.PermissionAction.DELETE, 'Purchase']),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PurchaseController.prototype, "remove", null);
PurchaseController = __decorate([
    (0, common_1.Controller)('purchase'),
    __metadata("design:paramtypes", [purchase_service_1.PurchaseService])
], PurchaseController);
exports.PurchaseController = PurchaseController;
//# sourceMappingURL=purchase.controller.js.map