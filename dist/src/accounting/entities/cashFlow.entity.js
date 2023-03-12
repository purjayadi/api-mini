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
exports.CashFlow = exports.typeFormat = void 0;
const employee_entity_1 = require("../../employee/entities/employee.entity");
const base_entity_1 = require("../../utils/base.entity");
const typeorm_1 = require("typeorm");
const category_entity_1 = require("../../category/entities/category.entity");
var typeFormat;
(function (typeFormat) {
    typeFormat["DEBIT"] = "Debit";
    typeFormat["CREDIT"] = "Credit";
})(typeFormat = exports.typeFormat || (exports.typeFormat = {}));
let CashFlow = class CashFlow extends base_entity_1.BaseColumn {
    async generateInvoice() {
        const date = new Date(this.date);
        this.code = this.code + 1;
        this.cashFlowNumber = `CF-${date.getFullYear()}${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${this.code}`;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], CashFlow.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
        type: 'integer',
        default: 0,
    }),
    __metadata("design:type", Number)
], CashFlow.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
    }),
    __metadata("design:type", String)
], CashFlow.prototype, "cashFlowNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        nullable: false,
    }),
    __metadata("design:type", Date)
], CashFlow.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CashFlow.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: typeFormat,
        default: typeFormat.DEBIT,
    }),
    __metadata("design:type", String)
], CashFlow.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
    }),
    __metadata("design:type", Number)
], CashFlow.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CashFlow.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CashFlow.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, (e) => e.cashFlow, {
        eager: true,
    }),
    __metadata("design:type", employee_entity_1.Employee)
], CashFlow.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (e) => e.cashFlows, {
        eager: true,
    }),
    __metadata("design:type", category_entity_1.Category)
], CashFlow.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CashFlow.prototype, "generateInvoice", null);
CashFlow = __decorate([
    (0, typeorm_1.Entity)()
], CashFlow);
exports.CashFlow = CashFlow;
//# sourceMappingURL=cashFlow.entity.js.map