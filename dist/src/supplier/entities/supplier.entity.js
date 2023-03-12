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
exports.Supplier = void 0;
const purchase_entity_1 = require("./../../purchase/entities/purchase.entity");
const product_entity_1 = require("./../../product/entities/product.entity");
const base_entity_1 = require("../../utils/base.entity");
const typeorm_1 = require("typeorm");
const returPurchase_entity_1 = require("../../returPurchase/entities/returPurchase.entity");
let Supplier = class Supplier extends base_entity_1.BaseColumn {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Supplier.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Supplier.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Supplier.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Supplier.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Supplier.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Supplier.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => product_entity_1.Product, (p) => p.supplier, {
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Supplier.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => purchase_entity_1.PurchaseOrder, (p) => p.supplier, {
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Supplier.prototype, "purchases", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => returPurchase_entity_1.ReturPurchase, (rp) => rp.supplier, {
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Supplier.prototype, "returPurchases", void 0);
Supplier = __decorate([
    (0, typeorm_1.Entity)()
], Supplier);
exports.Supplier = Supplier;
//# sourceMappingURL=supplier.entity.js.map