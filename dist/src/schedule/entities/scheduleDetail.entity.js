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
exports.ScheduleDetail = void 0;
const unit_entity_1 = require("./../../unit/entities/unit.entity");
const product_entity_1 = require("./../../product/entities/product.entity");
const schedule_entity_1 = require("./schedule.entity");
const typeorm_1 = require("typeorm");
let ScheduleDetail = class ScheduleDetail {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], ScheduleDetail.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        select: false,
    }),
    __metadata("design:type", String)
], ScheduleDetail.prototype, "scheduleId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ScheduleDetail.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'integer',
    }),
    __metadata("design:type", Number)
], ScheduleDetail.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ScheduleDetail.prototype, "unitId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => schedule_entity_1.Schedule, (c) => c.scheduleDetails, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", schedule_entity_1.Schedule)
], ScheduleDetail.prototype, "schedule", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_entity_1.Product, (p) => p.scheduleDetails, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        eager: true,
    }),
    __metadata("design:type", product_entity_1.Product)
], ScheduleDetail.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => unit_entity_1.Unit, (p) => p.scheduleDetails, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        eager: true,
    }),
    __metadata("design:type", unit_entity_1.Unit)
], ScheduleDetail.prototype, "unit", void 0);
ScheduleDetail = __decorate([
    (0, typeorm_1.Entity)()
], ScheduleDetail);
exports.ScheduleDetail = ScheduleDetail;
//# sourceMappingURL=scheduleDetail.entity.js.map