import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IResponse } from 'src/utils/interfaces/response.interface';
import { Repository } from 'typeorm';
import { CreatePermissionDto } from '../dto/permission.dto';
import { Permission } from '../entities/permission.entity';

@Injectable()
export class PermissionService {
  constructor(
    @Inject('PERMISSION_REPOSITORY')
    private repository: Repository<Permission>,
  ) {}

  async findAll(payload: any) {
    try {
      const { offset, limit } = payload;
      const permission = await this.repository.find({
        ...(limit && { take: limit }),
        ...(offset && { skip: offset }),
      });

      return { data: permission, error: null, status: HttpStatus.OK };
    } catch (error) {
      return {
        message: 'Unable to get permission',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async create(payload: CreatePermissionDto): Promise<IResponse> {
    try {
      const permission = await this.repository.save({
        ...payload,
      });
      return {
        message: 'Create permission successfully',
        data: permission,
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to create permission',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async findOne(id: string) {
    try {
      const permission = await this.repository.findOneBy({ id: id });
      if (!permission) {
        return {
          message: 'permission not Found',
          error: null,
          status: HttpStatus.NOT_FOUND,
        };
      }
      return { data: permission, error: null, status: HttpStatus.OK };
    } catch (error) {
      return {
        message: 'Unable to get permission',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async update(id: string, payload: any) {
    try {
      const permission = await this.repository.findOneBy({ id: id });
      if (!permission) {
        return {
          data: null,
          error: ['permission not Found'],
          status: HttpStatus.NOT_FOUND,
        };
      }
      await this.repository.update(id, payload);
      return {
        message: 'Update permission successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to update permission',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async remove(id: string) {
    try {
      const permission = await this.repository.findOneBy({ id: id });
      if (!permission) {
        return {
          data: null,
          error: ['permission not Found'],
          status: HttpStatus.NOT_FOUND,
        };
      }
      await this.repository.delete(id);
      return {
        message: 'Delete permission successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to delete permission',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
