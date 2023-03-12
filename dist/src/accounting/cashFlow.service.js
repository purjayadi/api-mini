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
exports.CashFlowService = void 0;
const hellper_1 = require("../utils/hellper");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
let CashFlowService = class CashFlowService {
    constructor(repository, kas) {
        this.repository = repository;
        this.kas = kas;
    }
    async findAll(payload) {
        try {
            const { offset, limit, search, startDate, endDate, categoryId } = payload;
            const data = await this.repository.findAndCount(Object.assign(Object.assign(Object.assign(Object.assign({}, (limit && { take: limit })), (offset && { skip: (offset - 1) * limit })), (search || startDate || endDate || categoryId
                ? {
                    where: Object.assign(Object.assign(Object.assign({}, (search && {
                        employee: {
                            name: (0, typeorm_1.Like)(`%${search}%`),
                        },
                        cashFlowNumber: (0, typeorm_1.Like)(`%${search}%`),
                    })), (startDate || endDate
                        ? { date: (0, typeorm_1.Between)(startDate, endDate) }
                        : {})), (categoryId && { categoryId: categoryId })),
                }
                : {})), { order: {
                    code: 'DESC',
                } }));
            return (0, hellper_1.paginateResponse)(data, offset, limit, null, common_1.HttpStatus.OK);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(payload) {
        var _a;
        try {
            const data = await this.repository.find({
                order: { code: 'DESC' },
                take: 1,
                skip: 0,
                withDeleted: true,
            });
            const trySave = this.repository.create(Object.assign(Object.assign({}, payload), { code: ((_a = data[0]) === null || _a === void 0 ? void 0 : _a.code) ? data[0].code : 0 }));
            const cashFlow = await this.repository.save(trySave);
            if (cashFlow) {
                const kas = {
                    date: payload.date,
                    description: payload.description,
                    source: 'Kas:' + cashFlow.cashFlowNumber,
                    debit: payload.type === 'Debit' ? cashFlow.amount : 0,
                    credit: payload.type === 'Credit' ? cashFlow.amount : 0,
                    categoryId: payload.categoryId,
                };
                await this.kas.save(kas);
            }
            return {
                message: 'Create data successfully',
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
            const data = await this.repository.findOneBy({ id });
            if (!data) {
                throw new common_1.NotFoundException('Data not found');
            }
            return { data: data, error: null, status: common_1.HttpStatus.OK };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findCashFlowByCode(code) {
        try {
            const data = await this.repository.findOneBy({
                cashFlowNumber: code,
            });
            if (!data) {
                throw new common_1.NotFoundException('Data not found');
            }
            return { data: data, error: null, status: common_1.HttpStatus.OK };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, payload) {
        try {
            const data = await this.repository.findOneBy({ id });
            if (!data) {
                throw new common_1.NotFoundException('Data not found');
            }
            await this.repository.update(id, payload);
            const findKas = await this.kas.findOneBy({
                source: 'Kas:' + data.cashFlowNumber,
            });
            const kas = {
                date: payload.date,
                description: payload.description,
                source: 'Kas:' + data.cashFlowNumber,
                debit: payload.type === 'Debit' ? payload.amount : 0,
                credit: payload.type === 'Credit' ? payload.amount : 0,
            };
            await this.kas.update(findKas.id, kas);
            return {
                message: 'Update data successfully',
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
            const data = await this.repository.findOneBy({ id });
            if (!data) {
                throw new common_1.NotFoundException('Data not found');
            }
            await this.repository.delete({ id });
            const findKas = await this.kas.findOneBy({
                source: 'Kas:' + data.cashFlowNumber,
            });
            await this.kas.softDelete({ id: findKas.id });
            return {
                message: 'Delete data successfully',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
CashFlowService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CASH_FLOW_REPOSITORY')),
    __param(1, (0, common_1.Inject)('KAS_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], CashFlowService);
exports.CashFlowService = CashFlowService;
//# sourceMappingURL=cashFlow.service.js.map