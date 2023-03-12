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
exports.DashboardController = void 0;
const permission_guard_1 = require("./../auth/permission.guard");
const jwt_auth_guard_1 = require("./../auth/jwt-auth.guard");
const common_1 = require("@nestjs/common");
const filters_dto_1 = require("../dto/filters.dto");
const dashboard_service_1 = require("./dashboard.service");
const dashboard_dto_1 = require("../dto/dashboard.dto");
let DashboardController = class DashboardController {
    constructor(service) {
        this.service = service;
    }
    findAll(payload) {
        return this.service.getSchedule(payload);
    }
    getWidget() {
        return this.service.getWidget();
    }
    getTransaction(payload) {
        return this.service.getTransaction(payload);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionsGuard),
    (0, common_1.Get)('/schedule'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filters_dto_1.FilterDto]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionsGuard),
    (0, common_1.Get)('/widget'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getWidget", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionsGuard),
    (0, common_1.Get)('/transaction'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dashboard_dto_1.DashboardTransactionDTO]),
    __metadata("design:returntype", void 0)
], DashboardController.prototype, "getTransaction", null);
DashboardController = __decorate([
    (0, common_1.Controller)('dashboard'),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
exports.DashboardController = DashboardController;
//# sourceMappingURL=dashboard.controller.js.map