import { UserRepositoryInterface } from './../repository/interface/user.repository.interface';
import { IResponse } from '../utils/interfaces/response.interface';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';

@Injectable()
export class UserService {
    constructor(
        @Inject('UserRepositoryInterface')
        private readonly repository: UserRepositoryInterface,

    ) { }

    async findAll(payload: FindUserDto): Promise<IResponse> {
        try {
            const { offset, limit } = payload;
            const user = await this.repository.findWithRelations({
                ...limit && { take: limit },
                ...offset && { skip: offset }
            });

            return { data: user, error: null, status: HttpStatus.OK };
        } catch (error) {
            return { message: "Unable to get user", error: error.message, status: HttpStatus.INTERNAL_SERVER_ERROR };
        }
    }

    async create(payload: CreateUserDto): Promise<IResponse> {
        try {
            await this.repository.create({
                ...payload,
                // password: await hash(payload.password),
                roles: payload.roles,
            });
            return { message: "Create user successfully", error: null, status: HttpStatus.OK };
        } catch (error) {
            return { message: "Unable to create user", error: error.message, status: HttpStatus.INTERNAL_SERVER_ERROR };
        }
    }

    async findOne(id: string): Promise<IResponse> {
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

    async update(id: string, payload: UpdateUserDto): Promise<IResponse> {
        try {
            const user = await this.repository.findOneById(id);
            if (!user) {
                return { data: null, error: ['User not Found'], status: HttpStatus.NOT_FOUND };
            }
            await this.repository.update(id, payload);
            return { message: "Update user successfully", error: null, status: HttpStatus.OK };
        } catch (error) {
            return { message: "Unable to update user", error: error.message, status: HttpStatus.INTERNAL_SERVER_ERROR };
        }
    }

    async remove(id: string): Promise<IResponse> {
        try {
            const user = await this.repository.findOneById(id);
            if (!user) {
                return { data: null, error: ['User not Found'], status: HttpStatus.NOT_FOUND };
            }
            await this.repository.remove(id);
            return { message: "Delete user successfully", error: null, status: HttpStatus.OK };
        } catch (error) {
            return { message: "Unable to delete user", error: error.message, status: HttpStatus.INTERNAL_SERVER_ERROR };
        }
    }

    async findOneByUsername(username: string): Promise<any> {
        const user = await this.repository.findByCondition({
            username: username
        });
        return user;
    }

    // check permission
    async checkPermission(userId: string) {
        const user = await this.repository.findOneById(userId);
        if (!user) {
            return false;
        }
        return user;
    }

}
