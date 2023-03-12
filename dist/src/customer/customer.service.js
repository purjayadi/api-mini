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
exports.CustomerService = void 0;
const hellper_1 = require("../utils/hellper");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
let CustomerService = class CustomerService {
    constructor(repository) {
        this.repository = repository;
    }
    async findAll(payload) {
        try {
            const { offset, limit, search } = payload;
            const customers = await this.repository.findAndCount(Object.assign(Object.assign(Object.assign(Object.assign({}, (limit && { take: limit })), (offset && { skip: (offset - 1) * limit })), (search && {
                where: [
                    {
                        customerNumber: (0, typeorm_1.Like)(`%${search}%`),
                    },
                    {
                        name: (0, typeorm_1.Like)(`%${search}%`),
                    },
                    {
                        shopName: (0, typeorm_1.Like)(`%${search}%`),
                    },
                    {
                        phone: (0, typeorm_1.Like)(`%${search}%`),
                    },
                ],
            })), { order: { code: 'ASC' } }));
            return (0, hellper_1.paginateResponse)(customers, offset, limit, null, common_1.HttpStatus.OK);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
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
            const saveCustomer = this.repository.create(Object.assign(Object.assign({}, payload), { code: ((_a = data[0]) === null || _a === void 0 ? void 0 : _a.code) ? data[0].code : 0 }));
            await this.repository.save(saveCustomer);
            return {
                message: 'Create customer successfully',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOne(id) {
        try {
            const customer = await this.repository.findOneBy({ id });
            if (!customer) {
                throw new common_1.NotFoundException('Customer not found');
            }
            return { data: customer, error: null, status: common_1.HttpStatus.OK };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, payload) {
        try {
            const customer = await this.repository.findOneBy({ id });
            if (!customer) {
                throw new common_1.NotFoundException('Customer not found');
            }
            await this.repository.update(id, payload);
            return {
                message: 'Update customer successfully',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async delete(id) {
        try {
            const customer = await this.repository.findOneBy({ id });
            if (!customer) {
                throw new common_1.NotFoundException('Customer not found');
            }
            await this.repository.delete(id);
            return {
                message: 'Delete customer successfully',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CUSTOMER_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], CustomerService);
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map