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
exports.OrderDetail = void 0;
const unit_entity_1 = require("./../../unit/entities/unit.entity");
const product_entity_1 = require("./../../product/entities/product.entity");
const typeorm_1 = require("typeorm");
const order_entity_1 = require("./order.entity");
let OrderDetail = class OrderDetail {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], OrderDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrderDetail.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrderDetail.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'int',
    }),
    __metadata("design:type", Number)
], OrderDetail.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
    }),
    __metadata("design:type", Number)
], OrderDetail.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
        nullable: true,
    }),
    __metadata("design:type", Number)
], OrderDetail.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
    }),
    __metadata("design:type", Number)
], OrderDetail.prototype, "subTotal", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrderDetail.prototype, "unitId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.Order, (order) => order.orderDetails, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", order_entity_1.Order)
], OrderDetail.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (product) => product.orderDetails, {
        eager: true,
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", product_entity_1.Product)
], OrderDetail.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => unit_entity_1.Unit, (unit) => unit.orderDetails, {
        eager: true,
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", unit_entity_1.Unit)
], OrderDetail.prototype, "unit", void 0);
OrderDetail = __decorate([
    (0, typeorm_1.Entity)()
], OrderDetail);
exports.OrderDetail = OrderDetail;
//# sourceMappingURL=orderDetail.entity.js.map