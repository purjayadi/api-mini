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
exports.Product = void 0;
const returOrderDetail_entity_1 = require("./../../returOrder/entities/returOrderDetail.entity");
const stock_entity_1 = require("./../../stock/entities/stock.entity");
const orderDetail_entity_1 = require("./../../order/entities/orderDetail.entity");
const scheduleDetail_entity_1 = require("./../../schedule/entities/scheduleDetail.entity");
const purchaseLine_entity_1 = require("./../../purchase/entities/purchaseLine.entity");
const warehouse_entity_1 = require("./../../warehouse/entities/warehouse.entity");
const supplier_entity_1 = require("./../../supplier/entities/supplier.entity");
const base_entity_1 = require("../../utils/base.entity");
const typeorm_1 = require("typeorm");
const price_entity_1 = require("./price.entity");
const returPurchaseDetail_entity_1 = require("../../returPurchase/entities/returPurchaseDetail.entity");
const category_entity_1 = require("../../category/entities/category.entity");
let Product = class Product extends base_entity_1.BaseColumn {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Product.prototype, "purchasePrice", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "supplierId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Product.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => supplier_entity_1.Supplier, (s) => s.products, {
        onUpdate: 'CASCADE',
        cascade: true,
    }),
    __metadata("design:type", supplier_entity_1.Supplier)
], Product.prototype, "supplier", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => price_entity_1.Price, (s) => s.product, {
        onUpdate: 'CASCADE',
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], Product.prototype, "prices", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => warehouse_entity_1.Warehouse, (w) => w.products, {
        onUpdate: 'CASCADE',
        cascade: true,
    }),
    __metadata("design:type", Array)
], Product.prototype, "warehouses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => purchaseLine_entity_1.PurchaseOrderLine, (p) => p.product),
    __metadata("design:type", Array)
], Product.prototype, "purchaseLines", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => scheduleDetail_entity_1.ScheduleDetail, (s) => s.product),
    __metadata("design:type", Array)
], Product.prototype, "scheduleDetails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orderDetail_entity_1.OrderDetail, (o) => o.product),
    __metadata("design:type", Array)
], Product.prototype, "orderDetails", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => stock_entity_1.Stock, (s) => s.product),
    __metadata("design:type", stock_entity_1.Stock)
], Product.prototype, "stock", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => returPurchaseDetail_entity_1.ReturPurchaseDetail, (rpd) => rpd.product),
    __metadata("design:type", Array)
], Product.prototype, "returPurchaseDetails", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => returOrderDetail_entity_1.ReturOrderDetail, (rpd) => rpd.product),
    __metadata("design:type", Array)
], Product.prototype, "returOrderDetails", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (s) => s.products, {
        onUpdate: 'CASCADE',
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", category_entity_1.Category)
], Product.prototype, "category", void 0);
Product = __decorate([
    (0, typeorm_1.Entity)()
], Product);
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map