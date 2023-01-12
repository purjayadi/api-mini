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
exports.SupplierBankAccount = void 0;
const base_entity_1 = require("../../utils/base.entity");
const typeorm_1 = require("typeorm");
let SupplierBankAccount = class SupplierBankAccount extends base_entity_1.BaseColumn {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], SupplierBankAccount.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        select: false,
    }),
    __metadata("design:type", String)
], SupplierBankAccount.prototype, "supplierId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SupplierBankAccount.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SupplierBankAccount.prototype, "accountNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SupplierBankAccount.prototype, "name", void 0);
SupplierBankAccount = __decorate([
    (0, typeorm_1.Entity)()
], SupplierBankAccount);
exports.SupplierBankAccount = SupplierBankAccount;
//# sourceMappingURL=supplierBankAccount.entity.js.map