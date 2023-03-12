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
exports.AccountingService = void 0;
const hellper_1 = require("../utils/hellper");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
let AccountingService = class AccountingService {
    constructor(repository) {
        this.repository = repository;
    }
    async findAll(payload) {
        try {
            const { offset, limit, search, startDate, endDate, categoryId, withDeleted, } = payload;
            const reduceKas = await this.repository.find(Object.assign({}, (search || startDate || endDate || categoryId
                ? {
                    where: [
                        search && {
                            description: (0, typeorm_1.Like)(`%${search}%`),
                        },
                        startDate || endDate
                            ? { date: (0, typeorm_1.Between)(startDate, endDate) }
                            : {},
                        categoryId && { categoryId: categoryId },
                    ],
                }
                : {})));
            const data = await this.repository.findAndCount(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (limit && { take: limit })), (offset && { skip: (offset - 1) * limit })), (withDeleted === 'true' ? { withDeleted: true } : {})), (search || startDate || endDate || categoryId
                ? {
                    where: [
                        search && {
                            description: (0, typeorm_1.Like)(`%${search}%`),
                        },
                        startDate || endDate
                            ? { date: (0, typeorm_1.Between)(startDate, endDate) }
                            : {},
                        categoryId && { categoryId: categoryId },
                    ],
                }
                : {})), { order: {
                    date: 'DESC',
                } }));
            const balance = reduceKas.reduce((acc, curr) => {
                const countData = acc + (curr.debit - curr.credit);
                return countData;
            }, 0);
            return (0, hellper_1.paginateResponse)(data, offset, limit, null, common_1.HttpStatus.OK, {
                balance: balance,
            });
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(payload) {
        try {
            await this.repository.save(payload);
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
    async update(id, payload) {
        try {
            const data = await this.repository.findOneBy({ id });
            if (!data) {
                throw new common_1.NotFoundException('Data not found');
            }
            await this.repository.update(id, payload);
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
AccountingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('KAS_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], AccountingService);
exports.AccountingService = AccountingService;
//# sourceMappingURL=accounting.service.js.map