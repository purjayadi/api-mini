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
exports.ReturPurchase = void 0;
const returPurchaseDetail_entity_1 = require("./returPurchaseDetail.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const supplier_entity_1 = require("../../supplier/entities/supplier.entity");
const base_entity_1 = require("../../utils/base.entity");
const typeorm_1 = require("typeorm");
let ReturPurchase = class ReturPurchase extends base_entity_1.BaseColumn {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ReturPurchase.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReturPurchase.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], ReturPurchase.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReturPurchase.prototype, "supplierId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
    }),
    __metadata("design:type", String)
], ReturPurchase.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
    }),
    __metadata("design:type", Number)
], ReturPurchase.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReturPurchase.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => supplier_entity_1.Supplier, (p) => p.returPurchases, {
        onUpdate: 'CASCADE',
        eager: true,
    }),
    __metadata("design:type", supplier_entity_1.Supplier)
], ReturPurchase.prototype, "supplier", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (u) => u.returPurchases, {
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", Array)
], ReturPurchase.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => returPurchaseDetail_entity_1.ReturPurchaseDetail, (p) => p.returPurchase, {
        onUpdate: 'CASCADE',
        eager: true,
        cascade: true,
    }),
    __metadata("design:type", Array)
], ReturPurchase.prototype, "returPurchaseDetails", void 0);
ReturPurchase = __decorate([
    (0, typeorm_1.Entity)()
], ReturPurchase);
exports.ReturPurchase = ReturPurchase;
//# sourceMappingURL=returPurchase.entity.js.map