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
exports.PiutangController = void 0;
const filters_dto_1 = require("./../dto/filters.dto");
const common_1 = require("@nestjs/common");
const casl_ability_factory_1 = require("../auth/casl.ability.factory");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const permission_decorator_1 = require("../auth/permission.decorator");
const permission_guard_1 = require("../auth/permission.guard");
const piutang_service_1 = require("./piutang.service");
const piutang_dto_1 = require("./piutang.dto");
let PiutangController = class PiutangController {
    constructor(service) {
        this.service = service;
    }
    findAll(payload) {
        return this.service.findAll(payload);
    }
    findPiutangByCustomer(payload) {
        return this.service.findPiutangByCustomer(payload);
    }
    findPayment(payload) {
        return this.service.findPayment(payload);
    }
    payment(payload) {
        return this.service.payment(payload);
    }
    remove(id) {
        return this.service.deletePayment(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionsGuard),
    (0, permission_decorator_1.CheckPermissions)([casl_ability_factory_1.PermissionAction.READ, 'Piutang']),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filters_dto_1.FilterDto]),
    __metadata("design:returntype", Promise)
], PiutangController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionsGuard),
    (0, permission_decorator_1.CheckPermissions)([casl_ability_factory_1.PermissionAction.READ, 'Piutang']),
    (0, common_1.Get)('find'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [piutang_dto_1.findPiutang]),
    __metadata("design:returntype", Promise)
], PiutangController.prototype, "findPiutangByCustomer", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionsGuard),
    (0, permission_decorator_1.CheckPermissions)([casl_ability_factory_1.PermissionAction.READ, 'Piutang']),
    (0, common_1.Get)('payment'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filters_dto_1.FilterDto]),
    __metadata("design:returntype", Promise)
], PiutangController.prototype, "findPayment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionsGuard),
    (0, permission_decorator_1.CheckPermissions)([casl_ability_factory_1.PermissionAction.READ, 'Piutang']),
    (0, common_1.Post)('payment'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [piutang_dto_1.PaymentDTO]),
    __metadata("design:returntype", Promise)
], PiutangController.prototype, "payment", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionsGuard),
    (0, permission_decorator_1.CheckPermissions)([casl_ability_factory_1.PermissionAction.READ, 'Piutang']),
    (0, common_1.Delete)('/payment/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PiutangController.prototype, "remove", null);
PiutangController = __decorate([
    (0, common_1.Controller)('piutang'),
    __metadata("design:paramtypes", [piutang_service_1.PiutangService])
], PiutangController);
exports.PiutangController = PiutangController;
//# sourceMappingURL=piutang.controller.js.map