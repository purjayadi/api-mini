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
exports.ReturOrderDetail = void 0;
const product_entity_1 = require("./../../product/entities/product.entity");
const unit_entity_1 = require("./../../unit/entities/unit.entity");
const typeorm_1 = require("typeorm");
const returOrder_entity_1 = require("./returOrder.entity");
let ReturOrderDetail = class ReturOrderDetail {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ReturOrderDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReturOrderDetail.prototype, "returOrderId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReturOrderDetail.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ReturOrderDetail.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReturOrderDetail.prototype, "unitId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
    }),
    __metadata("design:type", Number)
], ReturOrderDetail.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
    }),
    __metadata("design:type", Number)
], ReturOrderDetail.prototype, "subTotal", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => unit_entity_1.Unit, (p) => p.returOrderDetails, {
        onUpdate: 'CASCADE',
        eager: true,
    }),
    __metadata("design:type", unit_entity_1.Unit)
], ReturOrderDetail.prototype, "unit", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (u) => u.returOrderDetails, {
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", product_entity_1.Product)
], ReturOrderDetail.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => returOrder_entity_1.ReturOrder, (rp) => rp.returOrderDetails, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", returOrder_entity_1.ReturOrder)
], ReturOrderDetail.prototype, "returOrder", void 0);
ReturOrderDetail = __decorate([
    (0, typeorm_1.Entity)()
], ReturOrderDetail);
exports.ReturOrderDetail = ReturOrderDetail;
//# sourceMappingURL=returOrderDetail.entity.js.map