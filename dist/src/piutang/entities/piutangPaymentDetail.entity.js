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
exports.PiutangPaymentDetail = void 0;
const base_entity_1 = require("../../utils/base.entity");
const typeorm_1 = require("typeorm");
const piutang_entity_1 = require("./piutang.entity");
const piutangPayment_entity_1 = require("./piutangPayment.entity");
let PiutangPaymentDetail = class PiutangPaymentDetail extends base_entity_1.BaseColumn {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PiutangPaymentDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PiutangPaymentDetail.prototype, "piutangPaymentId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PiutangPaymentDetail.prototype, "piutangId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
    }),
    __metadata("design:type", Number)
], PiutangPaymentDetail.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => piutang_entity_1.Piutang, (p) => p.piutangPaymentDetails, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", piutang_entity_1.Piutang)
], PiutangPaymentDetail.prototype, "piutang", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => piutangPayment_entity_1.PiutangPayment, (p) => p.piutangPaymentDetails, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        eager: true,
    }),
    __metadata("design:type", piutangPayment_entity_1.PiutangPayment)
], PiutangPaymentDetail.prototype, "piutangPayment", void 0);
PiutangPaymentDetail = __decorate([
    (0, typeorm_1.Entity)()
], PiutangPaymentDetail);
exports.PiutangPaymentDetail = PiutangPaymentDetail;
//# sourceMappingURL=piutangPaymentDetail.entity.js.map