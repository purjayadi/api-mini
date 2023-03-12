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
exports.PiutangPayment = exports.PaymentMethod = void 0;
const base_entity_1 = require("../../utils/base.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("typeorm");
const piutang_entity_1 = require("./piutang.entity");
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CASH"] = "Cash";
    PaymentMethod["TRANSFER"] = "Transfer";
    PaymentMethod["TITIP_BAYAR"] = "Titip Bayar";
})(PaymentMethod = exports.PaymentMethod || (exports.PaymentMethod = {}));
let PiutangPayment = class PiutangPayment extends base_entity_1.BaseColumn {
    async generateInvoice() {
        const date = new Date(this.date);
        this.paymentNumber = `NH-${date.getFullYear()}${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${Math.floor(Math.random() * 10000)}`;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PiutangPayment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PiutangPayment.prototype, "piutangId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
    }),
    __metadata("design:type", String)
], PiutangPayment.prototype, "paymentNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], PiutangPayment.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], PiutangPayment.prototype, "note", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PiutangPayment.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
    }),
    __metadata("design:type", Number)
], PiutangPayment.prototype, "amount", void 0);
__decorate([
    (0, typeorm_2.ManyToOne)(() => piutang_entity_1.Piutang, (p) => p.piutangPayments, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", piutang_entity_1.Piutang)
], PiutangPayment.prototype, "piutang", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PiutangPayment.prototype, "generateInvoice", null);
PiutangPayment = __decorate([
    (0, typeorm_1.Entity)()
], PiutangPayment);
exports.PiutangPayment = PiutangPayment;
//# sourceMappingURL=piutangPayment.entity.js.map