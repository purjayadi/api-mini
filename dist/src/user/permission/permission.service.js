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
exports.PermissionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let PermissionService = class PermissionService {
    constructor(repository) {
        this.repository = repository;
    }
    async findAll(payload) {
        try {
            const { offset, limit } = payload;
            const permission = await this.repository.find(Object.assign(Object.assign({}, (limit && { take: limit })), (offset && { skip: offset })));
            return { data: permission, error: null, status: common_1.HttpStatus.OK };
        }
        catch (error) {
            return {
                message: 'Unable to get permission',
                error: error.message,
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async create(payload) {
        try {
            const permission = await this.repository.save(Object.assign({}, payload));
            return {
                message: 'Create permission successfully',
                data: permission,
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            return {
                message: 'Unable to create permission',
                error: error.message,
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async findOne(id) {
        try {
            const permission = await this.repository.findOneBy({ id: id });
            if (!permission) {
                return {
                    message: 'permission not Found',
                    error: null,
                    status: common_1.HttpStatus.NOT_FOUND,
                };
            }
            return { data: permission, error: null, status: common_1.HttpStatus.OK };
        }
        catch (error) {
            return {
                message: 'Unable to get permission',
                error: error.message,
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async update(id, payload) {
        try {
            const permission = await this.repository.findOneBy({ id: id });
            if (!permission) {
                return {
                    data: null,
                    error: ['permission not Found'],
                    status: common_1.HttpStatus.NOT_FOUND,
                };
            }
            await this.repository.update(id, payload);
            return {
                message: 'Update permission successfully',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            return {
                message: 'Unable to update permission',
                error: error.message,
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async remove(id) {
        try {
            const permission = await this.repository.findOneBy({ id: id });
            if (!permission) {
                return {
                    data: null,
                    error: ['permission not Found'],
                    status: common_1.HttpStatus.NOT_FOUND,
                };
            }
            await this.repository.delete(id);
            return {
                message: 'Delete permission successfully',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            return {
                message: 'Unable to delete permission',
                error: error.message,
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
};
PermissionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('PERMISSION_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], PermissionService);
exports.PermissionService = PermissionService;
//# sourceMappingURL=permission.service.js.map