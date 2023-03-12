import { paginateResponse } from 'src/utils/hellper';
import { DataSource, Repository } from 'typeorm';
import {
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
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
    @Inject('DATA_SOURCE') private readonly connection: DataSource,
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
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
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
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.repository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException('Role not found');
      }
      return { data: user, error: null, status: HttpStatus.OK };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, payload: any) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const role = await this.repository.findOneBy({ id });
      if (!role) {
        throw new NotFoundException('Role not found');
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
        status: HttpStatus.OK,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string) {
    try {
      const role = await this.repository.findOneBy({ id });
      if (!role) {
        throw new NotFoundException('Role not found');
      }
      await this.repository.delete(id);
      return {
        message: 'Delete role successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async assignPermission(
    id: string,
    payload: AssignPermission,
  ): Promise<IResponse> {
    try {
      const role = await this.repository.findOneBy({ id });
      if (!role) {
        throw new NotFoundException('Role not found');
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
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
