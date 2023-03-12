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
exports.UnitService = void 0;
const hellper_1 = require("../utils/hellper");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
let UnitService = class UnitService {
    constructor(repository) {
        this.repository = repository;
    }
    async findAll(payload) {
        try {
            const { offset, limit } = payload;
            const Units = await this.repository.findAndCount(Object.assign(Object.assign({}, (limit && { take: limit })), (offset && { skip: (offset - 1) * limit })));
            return (0, hellper_1.paginateResponse)(Units, offset, limit, null, common_1.HttpStatus.OK);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(payload) {
        try {
            await this.repository.save(Object.assign({}, payload));
            return {
                message: 'Create Unit successfully',
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
            const Unit = await this.repository.findOneBy({ id });
            if (!Unit) {
                throw new common_1.NotFoundException('Unit not Found');
            }
            return { data: Unit, error: null, status: common_1.HttpStatus.OK };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, payload) {
        try {
            const Unit = await this.repository.findOneBy({ id });
            if (!Unit) {
                throw new common_1.NotFoundException('Unit not Found');
            }
            await this.repository.update(id, payload);
            return {
                message: 'Update Unit successfully',
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
            const Unit = await this.repository.findOneBy({ id });
            if (!Unit) {
                throw new common_1.NotFoundException('Unit not Found');
            }
            await this.repository.delete(id);
            return {
                message: 'Delete Unit successfully',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
UnitService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('UNIT_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UnitService);
exports.UnitService = UnitService;
//# sourceMappingURL=unit.service.js.map