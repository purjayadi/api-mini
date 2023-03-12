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
exports.Schedule = exports.StatusFormat = void 0;
const employee_entity_1 = require("./../../employee/entities/employee.entity");
const customer_entity_1 = require("./../../customer/entities/customer.entity");
const scheduleDetail_entity_1 = require("./scheduleDetail.entity");
const base_entity_1 = require("../../utils/base.entity");
const typeorm_1 = require("typeorm");
var StatusFormat;
(function (StatusFormat) {
    StatusFormat["PENDING"] = "Pending";
    StatusFormat["PROCESS"] = "On Process";
    StatusFormat["CANCEL"] = "Canceled";
    StatusFormat["COMPLETE"] = "Done";
})(StatusFormat = exports.StatusFormat || (exports.StatusFormat = {}));
let Schedule = class Schedule extends base_entity_1.BaseColumn {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Schedule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Schedule.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        nullable: false,
    }),
    __metadata("design:type", Date)
], Schedule.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        select: false,
    }),
    __metadata("design:type", String)
], Schedule.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        select: false,
    }),
    __metadata("design:type", String)
], Schedule.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'text',
    }),
    __metadata("design:type", String)
], Schedule.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: StatusFormat,
        default: StatusFormat.PENDING,
    }),
    __metadata("design:type", String)
], Schedule.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => scheduleDetail_entity_1.ScheduleDetail, (c) => c.schedule, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], Schedule.prototype, "scheduleDetails", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, (c) => c.schedules, {
        eager: true,
    }),
    __metadata("design:type", customer_entity_1.Customer)
], Schedule.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, (e) => e.schedules, {
        eager: true,
    }),
    __metadata("design:type", employee_entity_1.Employee)
], Schedule.prototype, "employee", void 0);
Schedule = __decorate([
    (0, typeorm_1.Entity)()
], Schedule);
exports.Schedule = Schedule;
//# sourceMappingURL=schedule.entity.js.map