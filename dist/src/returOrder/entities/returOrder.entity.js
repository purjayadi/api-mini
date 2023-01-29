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
exports.ReturOrder = void 0;
const order_entity_1 = require("./../../order/entities/order.entity");
const user_entity_1 = require("../../user/entities/user.entity");
const base_entity_1 = require("../../utils/base.entity");
const typeorm_1 = require("typeorm");
const returOrderDetail_entity_1 = require("./returOrderDetail.entity");
let ReturOrder = class ReturOrder extends base_entity_1.BaseColumn {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ReturOrder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReturOrder.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], ReturOrder.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReturOrder.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
    }),
    __metadata("design:type", String)
], ReturOrder.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
    }),
    __metadata("design:type", Number)
], ReturOrder.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], ReturOrder.prototype, "isDecreasePiutang", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], ReturOrder.prototype, "isDecreaseKas", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: false,
    }),
    __metadata("design:type", Boolean)
], ReturOrder.prototype, "isIncrementStock", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ReturOrder.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_entity_1.Order, (p) => p.returOrders, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        eager: true,
    }),
    __metadata("design:type", order_entity_1.Order)
], ReturOrder.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (u) => u.returOrders, {
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.User)
], ReturOrder.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => returOrderDetail_entity_1.ReturOrderDetail, (p) => p.returOrder, {
        onUpdate: 'CASCADE',
        eager: true,
        cascade: true,
    }),
    __metadata("design:type", Array)
], ReturOrder.prototype, "returOrderDetails", void 0);
ReturOrder = __decorate([
    (0, typeorm_1.Entity)()
], ReturOrder);
exports.ReturOrder = ReturOrder;
//# sourceMappingURL=returOrder.entity.js.map