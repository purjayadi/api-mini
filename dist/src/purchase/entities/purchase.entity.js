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
exports.PurchaseOrder = exports.StatusFormat = void 0;
const warehouse_entity_1 = require("./../../warehouse/entities/warehouse.entity");
const purchaseLine_entity_1 = require("./purchaseLine.entity");
const supplier_entity_1 = require("./../../supplier/entities/supplier.entity");
const user_entity_1 = require("./../../user/entities/user.entity");
const base_entity_1 = require("../../utils/base.entity");
const typeorm_1 = require("typeorm");
var StatusFormat;
(function (StatusFormat) {
    StatusFormat["PO"] = "Pending Order";
    StatusFormat["PROCESS"] = "On Process";
    StatusFormat["CANCEL"] = "Canceled";
    StatusFormat["COMPLETE"] = "Done";
})(StatusFormat = exports.StatusFormat || (exports.StatusFormat = {}));
let PurchaseOrder = class PurchaseOrder extends base_entity_1.BaseColumn {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], PurchaseOrder.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PurchaseOrder.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], PurchaseOrder.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: StatusFormat,
        default: StatusFormat.PO,
    }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "supplierId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PurchaseOrder.prototype, "warehouseId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (u) => u.purchases),
    __metadata("design:type", user_entity_1.User)
], PurchaseOrder.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => supplier_entity_1.Supplier, (s) => s.purchases, {}),
    __metadata("design:type", supplier_entity_1.Supplier)
], PurchaseOrder.prototype, "supplier", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => purchaseLine_entity_1.PurchaseOrderLine, (pl) => pl.purchaseOrder, {
        onDelete: 'CASCADE',
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], PurchaseOrder.prototype, "purchaseLines", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => warehouse_entity_1.Warehouse, (w) => w.purchaseOrders, {
        eager: true,
    }),
    __metadata("design:type", warehouse_entity_1.Warehouse)
], PurchaseOrder.prototype, "warehouse", void 0);
PurchaseOrder = __decorate([
    (0, typeorm_1.Entity)()
], PurchaseOrder);
exports.PurchaseOrder = PurchaseOrder;
//# sourceMappingURL=purchase.entity.js.map