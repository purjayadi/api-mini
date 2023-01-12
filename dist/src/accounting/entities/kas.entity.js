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
exports.Kas = void 0;
const category_entity_1 = require("../../category/entities/category.entity");
const base_entity_1 = require("../../utils/base.entity");
const typeorm_1 = require("typeorm");
let Kas = class Kas extends base_entity_1.BaseColumn {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Kas.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        nullable: false,
    }),
    __metadata("design:type", Date)
], Kas.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Kas.prototype, "source", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Kas.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
    }),
    __metadata("design:type", Number)
], Kas.prototype, "debit", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
    }),
    __metadata("design:type", Number)
], Kas.prototype, "credit", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Kas.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (e) => e.kas, {
        eager: true,
    }),
    __metadata("design:type", category_entity_1.Category)
], Kas.prototype, "category", void 0);
Kas = __decorate([
    (0, typeorm_1.Entity)()
], Kas);
exports.Kas = Kas;
//# sourceMappingURL=kas.entity.js.map