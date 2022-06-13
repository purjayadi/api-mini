import { PermissionRepositoryInterface } from './../../repository/interface/user.repository.interface';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';

@Injectable()
export class PermissionService {
    constructor(
        @Inject('PermissionRepositoryInterface')
        private readonly repository: PermissionRepositoryInterface,

    ) { }

    async findAll(payload: any) {
        try {
            const { offset, limit } = payload;
            const permission = await this.repository.findWithRelations({
                ...limit && { take: limit },
                ...offset && { skip: offset }
            });

            return { data: permission, error: null, status: HttpStatus.OK };
        } catch (error) {
            return { message: "Unable to get permission", error: error.message, status: HttpStatus.INTERNAL_SERVER_ERROR };
        }
    }

    async create(payload: any) {
        try {
            await this.repository.create({
                ...payload,
            });
            return { message: "Create permission successfully", error: null, status: HttpStatus.OK };
        } catch (error) {
            return { message: "Unable to create permission", error: error.message, status: HttpStatus.INTERNAL_SERVER_ERROR };
        }
    }

    async findOne(id: string) {
        try {
            const user = await this.repository.findOneById(id);
            if (!user) {
                return { message: "User not Found", error: null, status: HttpStatus.NOT_FOUND };
            }
            return { data: user, error: null, status: HttpStatus.OK };
        } catch (error) {
            return { message: "Unable to get user", error: error.message, status: HttpStatus.INTERNAL_SERVER_ERROR };
        }
    }

    async update(id: string, payload: any) {
        try {
            const permission = await this.repository.findOneById(id);
            if (!permission) {
                return { data: null, error: ['permission not Found'], status: HttpStatus.NOT_FOUND };
            }
            await this.repository.update(id, payload);
            return { message: "Update permission successfully", error: null, status: HttpStatus.OK };
        } catch (error) {
            return { message: "Unable to update permission", error: error.message, status: HttpStatus.INTERNAL_SERVER_ERROR };
        }
    }

    async remove(id: string) {
        try {
            const permission = await this.repository.findOneById(id);
            if (!permission) {
                return { data: null, error: ['permission not Found'], status: HttpStatus.NOT_FOUND };
            }
            await this.repository.remove(id);
            return { message: "Delete permission successfully", error: null, status: HttpStatus.OK };
        } catch (error) {
            return { message: "Unable to delete permission", error: error.message, status: HttpStatus.INTERNAL_SERVER_ERROR };
        }
    }

}
