import { randomNumber } from './../utils/hellper';
import { IResponse } from '../utils/interfaces/response.interface';
import { SupplierRepositoryInterface } from './../repository/interface/supplier.repository.interface';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { FindSupplierDto } from './dto/find-supplier.dto';

@Injectable()
export class SupplierService {
  constructor(
    @Inject('SupplierRepositoryInterface')
    private readonly repository: SupplierRepositoryInterface,
  ) {}

  async findAll(payload: FindSupplierDto): Promise<IResponse> {
    try {
      const { offset, limit } = payload;
      const suppliers = await this.repository.findWithRelations({
        ...(limit && { take: limit }),
        ...(offset && { skip: offset }),
      });

      return { data: suppliers, error: null, status: HttpStatus.OK };
    } catch (error) {
      return {
        message: 'Unable to get supplier',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async create(payload: CreateSupplierDto): Promise<IResponse> {
    try {
      const count = await this.repository.countRecord();
      const number = randomNumber(1000, 9999);
      const code = 'SP-' + (count + number + 1);
      await this.repository.create({
        ...payload,
        code: code,
        supplierBankAccount: payload.supplierBankAccount,
      });
      return {
        message: 'Create supplier successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to create supplier',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async findOne(id: string): Promise<IResponse> {
    try {
      const supplier = await this.repository.findOneById(id);
      if (!supplier) {
        return {
          message: 'Supplier not Found',
          error: null,
          status: HttpStatus.NOT_FOUND,
        };
      }
      return { data: supplier, error: null, status: HttpStatus.OK };
    } catch (error) {
      return {
        message: 'Unable to get supplier',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async update(id: string, payload: UpdateSupplierDto): Promise<IResponse> {
    try {
      const supplier = await this.repository.findOneById(id);
      if (!supplier) {
        return {
          data: null,
          error: ['Supplier not Found'],
          status: HttpStatus.NOT_FOUND,
        };
      }
      await this.repository.update(id, payload);
      return {
        message: 'Update supplier successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to update supplier',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async remove(id: string): Promise<IResponse> {
    try {
      const supplier = await this.repository.findOneById(id);
      if (!supplier) {
        return {
          data: null,
          error: ['Supplier not Found'],
          status: HttpStatus.NOT_FOUND,
        };
      }
      await this.repository.remove(id);
      return {
        message: 'Delete supplier successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to delete supplier',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
