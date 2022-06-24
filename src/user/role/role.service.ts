import { paginateResponse } from 'src/utils/hellper';
import { Repository } from 'typeorm';
import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { AssignPermission } from '../dto/role.dto';
import { Role } from '../entities/role.entity';
import { RolePermission } from '../entities/rolePermission.entity';

@Injectable()
export class RoleService {
  constructor(
    @Inject('ROLE_REPOSITORY')
    private readonly repository: Repository<Role>,

    @Inject('ROLE_PERMISSION_REPOSITORY')
    private readonly rolePermission: Repository<RolePermission>,
  ) {}

  async findAll(payload: any): Promise<IResponse | IPaginate> {
    try {
      const { offset, limit } = payload;
      const role = await this.repository.findAndCount({
        ...(limit && { take: limit }),
        ...(offset && { skip: (offset - 1) * limit }),
      });

      return paginateResponse(role, offset, limit, null, HttpStatus.OK);
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
      const data = {
        ...payload,
        rolePermissions: payload.permissions,
      };
      // Logger.debug(data);
      await this.repository.save(data);
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
      const user = await this.repository.findOneBy({ id });
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
      const role = await this.repository.findOneBy({ id });
      if (!role) {
        return {
          data: null,
          error: ['Role not Found'],
          status: HttpStatus.NOT_FOUND,
        };
      }
      const data = {
        ...payload,
        id: id,
        rolePermissions: payload.permissions,
      };
      const updatedRole = this.repository.preload(data);
      await this.repository.save(await updatedRole);
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
      const role = await this.repository.findOneBy({ id });
      if (!role) {
        return {
          data: null,
          error: ['Role not Found'],
          status: HttpStatus.NOT_FOUND,
        };
      }
      await this.repository.delete(id);
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
      const role = await this.repository.findOneBy({ id });
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
      await this.rolePermission.save(data);
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
