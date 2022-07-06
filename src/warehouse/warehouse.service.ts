import { paginateResponse } from 'src/utils/hellper';
import { Repository } from 'typeorm';
import { FindDto } from './../utils/dto/find.dto';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { Warehouse } from './entities/warehouse.entity';
import { IResponse, IPaginate } from 'src/interface/response.interface';

@Injectable()
export class WarehouseService {
  constructor(
    @Inject('WAREHOUSE_REPOSITORY')
    private readonly repository: Repository<Warehouse>,
  ) {}

  async findAll(payload: FindDto): Promise<IResponse | IPaginate> {
    try {
      const { offset, limit } = payload;
      const warehouses = await this.repository.findAndCount({
        ...(limit && { take: limit }),
        ...(offset && { skip: (offset - 1) * limit }),
      });
      return paginateResponse(warehouses, offset, limit, null, HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(payload: CreateWarehouseDto): Promise<IResponse> {
    try {
      await this.repository.save({
        ...payload,
      });
      return {
        message: 'Create warehouse successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<IResponse> {
    try {
      const warehouse = await this.repository.findOneBy({ id });
      if (!warehouse) {
        throw new NotFoundException('Warehouse not found');
      }
      return { data: warehouse, error: null, status: HttpStatus.OK };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, payload: UpdateWarehouseDto): Promise<IResponse> {
    try {
      const warehouse = await this.repository.findOneBy({ id });
      if (!warehouse) {
        throw new NotFoundException('Warehouse not found');
      }
      await this.repository.update(id, payload);
      return {
        message: 'Update warehouse successfully',
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

  async remove(id: string): Promise<IResponse> {
    try {
      const warehouse = await this.repository.findOneBy({ id });
      if (!warehouse) {
        throw new NotFoundException('Warehouse not found');
      }
      await this.repository.delete(id);
      return {
        message: 'Delete warehouse successfully',
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
