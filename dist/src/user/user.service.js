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
exports.UserService = void 0;
const hellper_1 = require("../utils/hellper");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
let UserService = class UserService {
    constructor(repository) {
        this.repository = repository;
    }
    async findAll(payload) {
        try {
            const { offset, limit } = payload;
            const user = await this.repository.findAndCount(Object.assign(Object.assign({ relations: {
                    role: true,
                } }, (limit && { take: limit })), (offset && { skip: (offset - 1) * limit })));
            return (0, hellper_1.paginateResponse)(user, offset, limit, null, common_1.HttpStatus.OK);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(payload) {
        try {
            await this.repository.save(this.repository.create(payload));
            return {
                message: 'Create user successfully',
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
            const user = await this.repository.findOneBy({ id });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            return { data: user, error: null, status: common_1.HttpStatus.OK };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, payload) {
        try {
            const user = await this.repository.findOneBy({ id });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            await this.repository.update(id, payload);
            return {
                message: 'Update user successfully',
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
            const user = await this.repository.findOneBy({ id });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            await this.repository.delete(id);
            return {
                message: 'Delete user successfully',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findOneByUsername(username) {
        const user = await this.repository.findBy({
            username: username,
        });
        return user;
    }
    async checkPermission(id) {
        try {
            const users = await this.repository.findOneBy({ id });
            return users;
        }
        catch (error) {
            throw error;
        }
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map