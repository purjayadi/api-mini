import { FindDto } from './../utils/dto/find.dto';
import { WarehouseRepositoryInterface } from './../repository/interface/warehouse.repository.interface';
import { IResponse } from '../utils/interfaces/response.interface';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

@Injectable()
export class WarehouseService {
  constructor(
    @Inject('WarehouseRepositoryInterface')
    private readonly repository: WarehouseRepositoryInterface,
  ) {}

  async findAll(payload: FindDto): Promise<IResponse> {
    try {
      const { offset, limit } = payload;
      const warehouses = await this.repository.findWithRelations({
        ...(limit && { take: limit }),
        ...(offset && { skip: offset }),
      });
      return {
        data: warehouses,
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to get warehouse',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async create(payload: CreateWarehouseDto): Promise<IResponse> {
    try {
      await this.repository.create({
        ...payload,
      });
      return {
        message: 'Create warehouse successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to create warehouse',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async findOne(id: string): Promise<IResponse> {
    try {
      const warehouse = await this.repository.findOneById(id);
      if (!warehouse) {
        return {
          message: 'Warehouse not Found',
          error: null,
          status: HttpStatus.NOT_FOUND,
        };
      }
      return { data: warehouse, error: null, status: HttpStatus.OK };
    } catch (error) {
      return {
        message: 'Unable to get warehouse',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async update(id: string, payload: UpdateWarehouseDto): Promise<IResponse> {
    try {
      const warehouse = await this.repository.findOneById(id);
      if (!warehouse) {
        return {
          data: null,
          error: ['Warehouse not Found'],
          status: HttpStatus.NOT_FOUND,
        };
      }
      await this.repository.update(id, payload);
      return {
        message: 'Update warehouse successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to update warehouse',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async remove(id: string): Promise<IResponse> {
    try {
      const warehouse = await this.repository.findOneById(id);
      if (!warehouse) {
        return {
          data: null,
          error: ['Warehouse not Found'],
          status: HttpStatus.NOT_FOUND,
        };
      }
      await this.repository.remove(id);
      return {
        message: 'Delete warehouse successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to delete warehouse',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
