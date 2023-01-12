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
exports.UpdateScheduleDto = exports.ScheduleDetailDto = exports.CreateScheduleDto = exports.findScheduleDto = void 0;
const common_1 = require("@nestjs/common");
const mapped_types_1 = require("@nestjs/mapped-types");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const schedule_entity_1 = require("./entities/schedule.entity");
class findScheduleDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], findScheduleDto.prototype, "limit", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], findScheduleDto.prototype, "offset", void 0);
__decorate([
    (0, common_1.Optional)(),
    __metadata("design:type", String)
], findScheduleDto.prototype, "status", void 0);
__decorate([
    (0, common_1.Optional)(),
    __metadata("design:type", Date)
], findScheduleDto.prototype, "date", void 0);
exports.findScheduleDto = findScheduleDto;
class CreateScheduleDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Date)
], CreateScheduleDto.prototype, "date", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateScheduleDto.prototype, "customerId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateScheduleDto.prototype, "employeeId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateScheduleDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateScheduleDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateScheduleDto.prototype, "scheduleDetails", void 0);
exports.CreateScheduleDto = CreateScheduleDto;
class ScheduleDetailDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ScheduleDetailDto.prototype, "scheduleId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ScheduleDetailDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ScheduleDetailDto.prototype, "unitId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ScheduleDetailDto.prototype, "quantity", void 0);
exports.ScheduleDetailDto = ScheduleDetailDto;
class UpdateScheduleDto extends (0, mapped_types_1.PartialType)(CreateScheduleDto) {
}
exports.UpdateScheduleDto = UpdateScheduleDto;
//# sourceMappingURL=schedule.dto.js.map