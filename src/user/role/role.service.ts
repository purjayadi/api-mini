import { IResponse } from '../../utils/interfaces/response.interface';
import {
  RoleRepositoryInterface,
  RolePermissionRepositoryInterface,
} from './../../repository/interface/user.repository.interface';
import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { AssignPermission } from '../dto/role.dto';

@Injectable()
export class RoleService {
  constructor(
    @Inject('RoleRepositoryInterface')
    private readonly repository: RoleRepositoryInterface,

    @Inject('RolePermissionRepositoryInterface')
    private readonly rolePermission: RolePermissionRepositoryInterface,
  ) {}

  async findAll(payload: any) {
    try {
      const { offset, limit } = payload;
      const role = await this.repository.findWithRelations({
        ...(limit && { take: limit }),
        ...(offset && { skip: offset }),
      });

      return { data: role, error: null, status: HttpStatus.OK };
    } catch (error) {
      return {
        message: 'Unable to get role',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async create(payload: any) {
    try {
      await this.repository.create({
        ...payload,
      });
      return {
        message: 'Create role successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to create role',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.repository.findOneById(id);
      if (!user) {
        return {
          message: 'User not Found',
          error: null,
          status: HttpStatus.NOT_FOUND,
        };
      }
      return { data: user, error: null, status: HttpStatus.OK };
    } catch (error) {
      return {
        message: 'Unable to get user',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async update(id: string, payload: any) {
    try {
      const role = await this.repository.findOneById(id);
      if (!role) {
        return {
          data: null,
          error: ['Role not Found'],
          status: HttpStatus.NOT_FOUND,
        };
      }
      await this.repository.update(id, payload);
      return {
        message: 'Update role successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to update role',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async remove(id: string) {
    try {
      const role = await this.repository.findOneById(id);
      if (!role) {
        return {
          data: null,
          error: ['Role not Found'],
          status: HttpStatus.NOT_FOUND,
        };
      }
      await this.repository.remove(id);
      return {
        message: 'Delete role successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to delete role',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async assignPermission(
    id: string,
    payload: AssignPermission,
  ): Promise<IResponse> {
    try {
      const role = await this.repository.findOneById(id);
      if (!role) {
        return {
          data: null,
          error: ['Role not Found'],
          status: HttpStatus.NOT_FOUND,
        };
      }
      const data = [];
      Logger.debug(payload.permissions);
      if (payload.permissions.length) {
        // eslint-disable-next-line space-before-function-paren
        for (const permission of payload.permissions) {
          data.push({
            roleId: id,
            permissionId: permission,
          });
        }
      }
      await this.rolePermission.create(data);
      return {
        message: 'Assign permission successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to assign permission',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
