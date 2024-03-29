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
exports.Piutang = void 0;
const order_entity_1 = require("./../../order/entities/order.entity");
const base_entity_1 = require("../../utils/base.entity");
const typeorm_1 = require("typeorm");
const piutangPayment_entity_1 = require("./piutangPayment.entity");
let Piutang = class Piutang extends base_entity_1.BaseColumn {
    isPaid() {
        return this.remaining === 0;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Piutang.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Piutang.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
    }),
    __metadata("design:type", Number)
], Piutang.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
    }),
    __metadata("design:type", Number)
], Piutang.prototype, "remaining", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => order_entity_1.Order, (order) => order.piutang, {
        eager: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", order_entity_1.Order)
], Piutang.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => piutangPayment_entity_1.PiutangPayment, (payment) => payment.piutang, {
        eager: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Piutang.prototype, "piutangPayments", void 0);
Piutang = __decorate([
    (0, typeorm_1.Entity)()
], Piutang);
exports.Piutang = Piutang;
//# sourceMappingURL=piutang.entity.js.map