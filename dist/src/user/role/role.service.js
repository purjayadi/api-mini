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
exports.RoleService = void 0;
const hellper_1 = require("../../utils/hellper");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
let RoleService = class RoleService {
    constructor(repository, rolePermission, connection) {
        this.repository = repository;
        this.rolePermission = rolePermission;
        this.connection = connection;
    }
    async findAll(payload) {
        try {
            const { offset, limit } = payload;
            const role = await this.repository.findAndCount(Object.assign(Object.assign({}, (limit && { take: limit })), (offset && { skip: (offset - 1) * limit })));
            return (0, hellper_1.paginateResponse)(role, offset, limit, null, common_1.HttpStatus.OK);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async create(payload) {
        try {
            const data = Object.assign(Object.assign({}, payload), { rolePermissions: payload.permissions });
            await this.repository.save(data);
            return {
                message: 'Create role successfully',
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
                throw new common_1.NotFoundException('Role not found');
            }
            return { data: user, error: null, status: common_1.HttpStatus.OK };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, payload) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const role = await this.repository.findOneBy({ id });
            if (!role) {
                throw new common_1.NotFoundException('Role not found');
            }
            const rolePermissions = [];
            if (payload.permissions.length) {
                payload.permissions.forEach((permission) => {
                    rolePermissions.push({
                        roleId: role.id,
                        permissionId: permission.permissionId,
                    });
                });
            }
            const data = {
                name: payload.name,
            };
            await this.rolePermission.delete({ roleId: id });
            await this.repository.update(id, data);
            await this.rolePermission.save(rolePermissions);
            return {
                message: 'Update role successfully',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            const role = await this.repository.findOneBy({ id });
            if (!role) {
                throw new common_1.NotFoundException('Role not found');
            }
            await this.repository.delete(id);
            return {
                message: 'Delete role successfully',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async assignPermission(id, payload) {
        try {
            const role = await this.repository.findOneBy({ id });
            if (!role) {
                throw new common_1.NotFoundException('Role not found');
            }
            const data = [];
            common_1.Logger.debug(payload.permissions);
            if (payload.permissions.length) {
                for (const permission of payload.permissions) {
                    data.push({
                        roleId: id,
                        permissionId: permission,
                    });
                }
            }
            await this.rolePermission.save(data);
            return {
                message: 'Assign permission successfully',
                error: null,
                status: common_1.HttpStatus.OK,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
RoleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ROLE_REPOSITORY')),
    __param(1, (0, common_1.Inject)('ROLE_PERMISSION_REPOSITORY')),
    __param(2, (0, common_1.Inject)('DATA_SOURCE')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.DataSource])
], RoleService);
exports.RoleService = RoleService;
//# sourceMappingURL=role.service.js.map