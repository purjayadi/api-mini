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
exports.ReturPurchaseController = void 0;
const filters_dto_1 = require("./../dto/filters.dto");
const common_1 = require("@nestjs/common");
const returPurchase_service_1 = require("./returPurchase.service");
const returPurchase_dto_1 = require("./returPurchase.dto");
let ReturPurchaseController = class ReturPurchaseController {
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
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filters_dto_1.FilterDto]),
    __metadata("design:returntype", Promise)
], ReturPurchaseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [returPurchase_dto_1.CreateReturPurchaseDto]),
    __metadata("design:returntype", void 0)
], ReturPurchaseController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReturPurchaseController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, returPurchase_dto_1.UpdateReturPurchaseDTO]),
    __metadata("design:returntype", void 0)
], ReturPurchaseController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ReturPurchaseController.prototype, "remove", null);
ReturPurchaseController = __decorate([
    (0, common_1.Controller)('retur-purchase'),
    __metadata("design:paramtypes", [returPurchase_service_1.ReturPurchaseService])
], ReturPurchaseController);
exports.ReturPurchaseController = ReturPurchaseController;
//# sourceMappingURL=returPurchase.controller.js.map