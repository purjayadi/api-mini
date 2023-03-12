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
exports.Customer = void 0;
const order_entity_1 = require("./../../order/entities/order.entity");
const schedule_entity_1 = require("./../../schedule/entities/schedule.entity");
const employee_entity_1 = require("./../../employee/entities/employee.entity");
const base_entity_1 = require("../../utils/base.entity");
const typeorm_1 = require("typeorm");
const city_entity_1 = require("../../address/entities/city.entity");
const subDistrict_entity_1 = require("../../address/entities/subDistrict.entity");
const district_entity_1 = require("../../address/entities/district.entity");
let Customer = class Customer extends base_entity_1.BaseColumn {
    async generateInvoice() {
        const date = new Date(this.joinDate);
        this.code = this.code + 1;
        this.customerNumber = `CGM-${date.getFullYear()}${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${this.code}`;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Customer.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
        type: 'integer',
        default: 0,
    }),
    __metadata("design:type", Number)
], Customer.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Customer.prototype, "customerNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Customer.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Customer.prototype, "shopName", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
    }),
    __metadata("design:type", String)
], Customer.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Customer.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'toko.jpg' }),
    __metadata("design:type", String)
], Customer.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Customer.prototype, "gps", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        select: false,
    }),
    __metadata("design:type", String)
], Customer.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
    }),
    __metadata("design:type", Date)
], Customer.prototype, "joinDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        select: false,
    }),
    __metadata("design:type", Number)
], Customer.prototype, "cityId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        select: false,
    }),
    __metadata("design:type", Number)
], Customer.prototype, "districtId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        select: false,
    }),
    __metadata("design:type", Number)
], Customer.prototype, "subDistrictId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => city_entity_1.City, (c) => c.customer, {
        eager: true,
    }),
    __metadata("design:type", city_entity_1.City)
], Customer.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => district_entity_1.District, (d) => d.customer, {
        eager: true,
    }),
    __metadata("design:type", district_entity_1.District)
], Customer.prototype, "district", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subDistrict_entity_1.SubDistrict, (s) => s.customer, {
        eager: true,
    }),
    __metadata("design:type", subDistrict_entity_1.SubDistrict)
], Customer.prototype, "subDistrict", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, (e) => e.customers, {
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        eager: true,
    }),
    __metadata("design:type", employee_entity_1.Employee)
], Customer.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => schedule_entity_1.Schedule, (s) => s.customer, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Customer.prototype, "schedules", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.Order, (o) => o.customer),
    __metadata("design:type", Array)
], Customer.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Customer.prototype, "generateInvoice", null);
Customer = __decorate([
    (0, typeorm_1.Entity)()
], Customer);
exports.Customer = Customer;
//# sourceMappingURL=customer.entity.js.map