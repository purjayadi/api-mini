import { paginateResponse } from 'src/utils/hellper';
import { Repository } from 'typeorm';
import { randomNumber } from './../utils/hellper';
import {
  HttpStatus,
  Inject,
  Injectable,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { FindSupplierDto } from './dto/find-supplier.dto';
import { Supplier } from './entities/supplier.entity';
import { IResponse, IPaginate } from '../interface/response.interface';

@Injectable()
export class SupplierService {
  constructor(
    @Inject('SUPPLIER_REPOSITORY')
    private readonly repository: Repository<Supplier>,
  ) {}

  async findAll(payload: FindSupplierDto): Promise<IResponse | IPaginate> {
    try {
      const { offset, limit } = payload;
      const suppliers = await this.repository.findAndCount({
        ...(limit && { take: limit }),
        ...(offset && { skip: (offset - 1) * limit }),
      });
      return paginateResponse(suppliers, offset, limit, null, HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(payload: CreateSupplierDto): Promise<IResponse> {
    try {
      const count = await this.repository.count();
      const number = randomNumber(1000, 9999);
      const code = 'SP-' + (count + number + 1);
      await this.repository.save({
        ...payload,
        code: code,
      });
      return {
        message: 'Create supplier successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<IResponse> {
    try {
      const supplier = await this.repository.findOneBy({ id });
      if (!supplier) {
        throw new NotFoundException('Supplier not found');
      }
      return { data: supplier, error: null, status: HttpStatus.OK };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, payload: UpdateSupplierDto): Promise<IResponse> {
    try {
      const supplier = await this.repository.findOneBy({ id });
      if (!supplier) {
        throw new NotFoundException('Supplier not found');
      }
      await this.repository.update(id, payload);
      return {
        message: 'Update supplier successfully',
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
      const supplier = await this.repository.findOneBy({ id });
      if (!supplier) {
        throw new NotFoundException('Supplier not found');
      }
      await this.repository.delete(id);
      return {
        message: 'Delete supplier successfully',
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
