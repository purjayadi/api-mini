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
exports.PurchaseOrderLine = void 0;
const unit_entity_1 = require("./../../unit/entities/unit.entity");
const product_entity_1 = require("./../../product/entities/product.entity");
const purchase_entity_1 = require("./purchase.entity");
const base_entity_1 = require("../../utils/base.entity");
const typeorm_1 = require("typeorm");
let PurchaseOrderLine = class PurchaseOrderLine extends base_entity_1.BaseColumn {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PurchaseOrderLine.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PurchaseOrderLine.prototype, "purchaseOrderId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PurchaseOrderLine.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PurchaseOrderLine.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PurchaseOrderLine.prototype, "unitId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
    }),
    __metadata("design:type", Number)
], PurchaseOrderLine.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
    }),
    __metadata("design:type", Number)
], PurchaseOrderLine.prototype, "subTotal", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => purchase_entity_1.PurchaseOrder, (po) => po.purchaseLines, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", purchase_entity_1.PurchaseOrder)
], PurchaseOrderLine.prototype, "purchaseOrder", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (p) => p.purchaseLines, {
        eager: true,
    }),
    __metadata("design:type", product_entity_1.Product)
], PurchaseOrderLine.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => unit_entity_1.Unit, (u) => u.purchaseLines, {
        eager: true,
    }),
    __metadata("design:type", unit_entity_1.Unit)
], PurchaseOrderLine.prototype, "unit", void 0);
PurchaseOrderLine = __decorate([
    (0, typeorm_1.Entity)()
], PurchaseOrderLine);
exports.PurchaseOrderLine = PurchaseOrderLine;
//# sourceMappingURL=purchaseLine.entity.js.map