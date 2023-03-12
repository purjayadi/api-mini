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
exports.District = void 0;
const customer_entity_1 = require("./../../customer/entities/customer.entity");
const typeorm_1 = require("typeorm");
const city_entity_1 = require("./city.entity");
const subDistrict_entity_1 = require("./subDistrict.entity");
let District = class District {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], District.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], District.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({
        select: false,
    }),
    __metadata("design:type", Number)
], District.prototype, "cityId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => city_entity_1.City, (city) => city.districts, {
        onUpdate: 'CASCADE',
    }),
    __metadata("design:type", city_entity_1.City)
], District.prototype, "city", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => subDistrict_entity_1.SubDistrict, (sub) => sub.district, {
        onUpdate: 'CASCADE',
        cascade: true,
    }),
    (0, typeorm_1.JoinTable)(),
    __metadata("design:type", Array)
], District.prototype, "subDistricts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => customer_entity_1.Customer, (u) => u.district, {
        onUpdate: 'CASCADE',
        cascade: true,
    }),
    __metadata("design:type", Array)
], District.prototype, "customer", void 0);
District = __decorate([
    (0, typeorm_1.Entity)()
], District);
exports.District = District;
//# sourceMappingURL=district.entity.js.map