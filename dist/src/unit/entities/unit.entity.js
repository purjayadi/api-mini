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
exports.Unit = void 0;
const returOrderDetail_entity_1 = require("./../../returOrder/entities/returOrderDetail.entity");
const returPurchaseDetail_entity_1 = require("./../../returPurchase/entities/returPurchaseDetail.entity");
const orderDetail_entity_1 = require("./../../order/entities/orderDetail.entity");
const scheduleDetail_entity_1 = require("./../../schedule/entities/scheduleDetail.entity");
const purchaseLine_entity_1 = require("./../../purchase/entities/purchaseLine.entity");
const price_entity_1 = require("../../product/entities/price.entity");
const base_entity_1 = require("../../utils/base.entity");
const typeorm_1 = require("typeorm");
let Unit = class Unit extends base_entity_1.BaseColumn {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Unit.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Unit.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => price_entity_1.Price, (s) => s.unit, {
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Unit.prototype, "prices", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => purchaseLine_entity_1.PurchaseOrderLine, (pol) => pol.unit, {
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Unit.prototype, "purchaseLines", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => scheduleDetail_entity_1.ScheduleDetail, (s) => s.unit),
    __metadata("design:type", Array)
], Unit.prototype, "scheduleDetails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orderDetail_entity_1.OrderDetail, (s) => s.unit),
    __metadata("design:type", Array)
], Unit.prototype, "orderDetails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => returPurchaseDetail_entity_1.ReturPurchaseDetail, (rpd) => rpd.unit),
    __metadata("design:type", Array)
], Unit.prototype, "returPurchaseDetails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => returOrderDetail_entity_1.ReturOrderDetail, (rpd) => rpd.unit),
    __metadata("design:type", Array)
], Unit.prototype, "returOrderDetails", void 0);
Unit = __decorate([
    (0, typeorm_1.Entity)()
], Unit);
exports.Unit = Unit;
//# sourceMappingURL=unit.entity.js.map