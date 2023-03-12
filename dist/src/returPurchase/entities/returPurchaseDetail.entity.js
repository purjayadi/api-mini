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
exports.ReturPurchaseDetail = void 0;
const returPurchase_entity_1 = require("./returPurchase.entity");
const product_entity_1 = require("./../../product/entities/product.entity");
const unit_entity_1 = require("./../../unit/entities/unit.entity");
const typeorm_1 = require("typeorm");
let ReturPurchaseDetail = class ReturPurchaseDetail {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ReturPurchaseDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        select: false,
    }),
    __metadata("design:type", String)
], ReturPurchaseDetail.prototype, "returPurchaseId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReturPurchaseDetail.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ReturPurchaseDetail.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReturPurchaseDetail.prototype, "unitId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
    }),
    __metadata("design:type", Number)
], ReturPurchaseDetail.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
    }),
    __metadata("design:type", Number)
], ReturPurchaseDetail.prototype, "subTotal", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => unit_entity_1.Unit, (p) => p.returPurchaseDetails, {
        onUpdate: 'CASCADE',
        eager: true,
    }),
    __metadata("design:type", unit_entity_1.Unit)
], ReturPurchaseDetail.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (u) => u.returPurchaseDetails, {
        onUpdate: 'CASCADE',
        eager: true,
    }),
    __metadata("design:type", product_entity_1.Product)
], ReturPurchaseDetail.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => returPurchase_entity_1.ReturPurchase, (rp) => rp.returPurchaseDetails, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", returPurchase_entity_1.ReturPurchase)
], ReturPurchaseDetail.prototype, "returPurchase", void 0);
ReturPurchaseDetail = __decorate([
    (0, typeorm_1.Entity)()
], ReturPurchaseDetail);
exports.ReturPurchaseDetail = ReturPurchaseDetail;
//# sourceMappingURL=returPurchaseDetail.entity.js.map