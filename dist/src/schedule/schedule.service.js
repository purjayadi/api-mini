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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleService = void 0;
const hellper_1 = require("../utils/hellper");
const typeorm_1 = require("typeorm");
const hellper_2 = require("./../utils/hellper");
const common_1 = require("@nestjs/common");
let ScheduleService = class ScheduleService {
    constructor(repository, scheduleDetail) {
        this.repository = repository;
        this.scheduleDetail = scheduleDetail;
    }
    async findAll(payload) {
        try {
            const { offset, limit, status, date } = payload;
            const schedule = await this.repository.findAndCount(Object.assign(Object.assign(Object.assign({}, (limit && { take: limit })), (offset && { skip: (offset - 1) * limit })), { where: Object.assign(Object.assign({}, (status && { status: status })), (date && { date: date })) }));
            return (0, hellper_1.paginateResponse)(schedule, offset, limit, null, common_1.HttpStatus.OK);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(payload) {
        try {
            const count = await this.repository.count();
            const number = (0, hellper_2.randomNumber)(1000, 9999);
            const code = 'NSJ-' + (count + number + 1);
            await this.repository.save(Object.assign(Object.assign({}, payload), { code: code }));
            return {
                message: 'Create schedule successfully',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const schedule = await this.repository.findOneBy({ id });
            if (!schedule) {
                throw new common_1.NotFoundException('Schedule not found');
            }
            return { data: schedule, error: null, status: common_1.HttpStatus.OK };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, payload) {
        try {
            const schedule = await this.repository.findOneBy({ id });
            if (!schedule) {
                throw new common_1.NotFoundException('Schedule not found');
            }
            const payloadUpdate = {
                date: payload.date,
                customerId: payload.customerId,
                employeeId: payload.employeeId,
                description: payload.description,
                status: payload.status,
            };
            await this.repository.update(id, payloadUpdate);
            await this.scheduleDetail.delete({ scheduleId: id });
            const detail = [];
            payload.scheduleDetails.map((item) => {
                detail.push(Object.assign(Object.assign({}, item), { scheduleId: id }));
            });
            await this.scheduleDetail.save(detail);
            return {
                message: 'Update schedule successfully',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const schedule = await this.repository.findOneBy({ id });
            if (!schedule) {
                throw new common_1.NotFoundException('Schedule not found');
            }
            await this.repository.delete(id);
            return {
                message: 'Delete schedule successfully',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
ScheduleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SCHEDULE_REPOSITORY')),
    __param(1, (0, common_1.Inject)('SCHEDULE_DETAIL_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], ScheduleService);
exports.ScheduleService = ScheduleService;
//# sourceMappingURL=schedule.service.js.map