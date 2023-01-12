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
exports.Order = exports.Status = exports.PaymentMethod = void 0;
const employee_entity_1 = require("./../../employee/entities/employee.entity");
const customer_entity_1 = require("./../../customer/entities/customer.entity");
const base_entity_1 = require("../../utils/base.entity");
const typeorm_1 = require("typeorm");
const orderDetail_entity_1 = require("./orderDetail.entity");
const piutang_entity_1 = require("../../piutang/entities/piutang.entity");
var PaymentMethod;
(function (PaymentMethod) {
    PaymentMethod["CASH"] = "Cash";
    PaymentMethod["TRANSFER"] = "Transfer";
    PaymentMethod["DUE_DATE"] = "Due Date";
})(PaymentMethod = exports.PaymentMethod || (exports.PaymentMethod = {}));
var Status;
(function (Status) {
    Status["PO"] = "Pending Order";
    Status["COMPLETED"] = "Completed";
    Status["CANCELED"] = "Canceled";
})(Status = exports.Status || (exports.Status = {}));
let Order = class Order extends base_entity_1.BaseColumn {
    updateStatus() {
        this.status = Status.CANCELED;
    }
    async generateInvoice() {
        const date = new Date(this.date);
        this.code = this.code + 1;
        this.invNumber = `INV-${date.getFullYear()}${(date.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${this.code}`;
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        unique: true,
        type: 'integer',
        default: 0,
    }),
    __metadata("design:type", Number)
], Order.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'varchar',
        length: 50,
    }),
    __metadata("design:type", String)
], Order.prototype, "invNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
    }),
    __metadata("design:type", Date)
], Order.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: Status,
        default: Status.PO,
    }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'decimal',
    }),
    __metadata("design:type", Number)
], Order.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Order.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Order.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'date',
        nullable: true,
    }),
    __metadata("design:type", Date)
], Order.prototype, "dueDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], Order.prototype, "createdBy", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: PaymentMethod,
        default: PaymentMethod.CASH,
    }),
    __metadata("design:type", String)
], Order.prototype, "paymentMethod", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => orderDetail_entity_1.OrderDetail, (orderDetail) => orderDetail.order, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], Order.prototype, "orderDetails", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => customer_entity_1.Customer, (c) => c.orders, {
        eager: true,
    }),
    __metadata("design:type", customer_entity_1.Customer)
], Order.prototype, "customer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => employee_entity_1.Employee, (e) => e.orders, {
        eager: true,
    }),
    __metadata("design:type", employee_entity_1.Employee)
], Order.prototype, "employee", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => piutang_entity_1.Piutang, (piutang) => piutang.order, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        cascade: true,
    }),
    __metadata("design:type", piutang_entity_1.Piutang)
], Order.prototype, "piutang", void 0);
__decorate([
    (0, typeorm_1.AfterSoftRemove)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Order.prototype, "updateStatus", null);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Order.prototype, "generateInvoice", null);
Order = __decorate([
    (0, typeorm_1.Entity)()
], Order);
exports.Order = Order;
//# sourceMappingURL=order.entity.js.map