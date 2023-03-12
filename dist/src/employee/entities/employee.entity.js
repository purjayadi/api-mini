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
exports.Employee = exports.StatusFormat = exports.GenderFormat = void 0;
const order_entity_1 = require("./../../order/entities/order.entity");
const schedule_entity_1 = require("./../../schedule/entities/schedule.entity");
const user_entity_1 = require("./../../user/entities/user.entity");
const customer_entity_1 = require("./../../customer/entities/customer.entity");
const base_entity_1 = require("../../utils/base.entity");
const typeorm_1 = require("typeorm");
const cashFlow_entity_1 = require("../../accounting/entities/cashFlow.entity");
var GenderFormat;
(function (GenderFormat) {
    GenderFormat["MALE"] = "male";
    GenderFormat["FEMALE"] = "female";
})(GenderFormat = exports.GenderFormat || (exports.GenderFormat = {}));
var StatusFormat;
(function (StatusFormat) {
    StatusFormat["MARRIED"] = "married";
    StatusFormat["SINGLE"] = "single";
})(StatusFormat = exports.StatusFormat || (exports.StatusFormat = {}));
let Employee = class Employee extends base_entity_1.BaseColumn {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Employee.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Employee.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Employee.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], Employee.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
    }),
    __metadata("design:type", String)
], Employee.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: GenderFormat,
        default: GenderFormat.MALE,
    }),
    __metadata("design:type", String)
], Employee.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 'employee.jpg',
    }),
    __metadata("design:type", String)
], Employee.prototype, "photo", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Employee.prototype, "joinDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: StatusFormat,
        default: StatusFormat.SINGLE,
    }),
    __metadata("design:type", String)
], Employee.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        default: 1,
    }),
    __metadata("design:type", Boolean)
], Employee.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => customer_entity_1.Customer, (c) => c.employee),
    __metadata("design:type", Array)
], Employee.prototype, "customers", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (u) => u.employee, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", user_entity_1.User)
], Employee.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => schedule_entity_1.Schedule, (s) => s.employee, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Employee.prototype, "schedules", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_entity_1.Order, (o) => o.employee),
    __metadata("design:type", Array)
], Employee.prototype, "orders", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cashFlow_entity_1.CashFlow, (o) => o.employee, {
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Employee.prototype, "cashFlow", void 0);
Employee = __decorate([
    (0, typeorm_1.Entity)()
], Employee);
exports.Employee = Employee;
//# sourceMappingURL=employee.entity.js.map