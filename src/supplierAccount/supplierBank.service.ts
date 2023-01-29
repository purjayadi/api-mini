import { Repository } from 'typeorm';
import { IResponse } from '../utils/interfaces/response.interface';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SupplierBankAccount } from './entities/supplierBankAccount.entity';
import { CreateSupplierBankDto, FindSupplierBankDto } from './supplierBank.dto';

@Injectable()
export class SupplierBankService {
  constructor(
    @Inject('SUPPLIER_BANK_REPOSITORY')
    private readonly repository: Repository<SupplierBankAccount>,
  ) {}

  async findAll(payload: FindSupplierBankDto): Promise<IResponse> {
    try {
      const { offset, limit } = payload;
      const suppliers = await this.repository.find({
        ...(limit && { take: limit }),
        ...(offset && { skip: offset }),
      });

      return { data: suppliers, error: null, status: HttpStatus.OK };
    } catch (error) {
      return {
        message: 'Unable to get supplier bank account',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async create(payload: CreateSupplierBankDto): Promise<IResponse> {
    try {
      await this.repository.save({
        ...payload,
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
      const supplier = await this.repository.findOneBy({ id });
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

  async update(
    id: string,
    payload: Partial<CreateSupplierBankDto>,
  ): Promise<IResponse> {
    try {
      const supplier = await this.repository.findOneBy({ id });
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
      await this.repository.delete(id);
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
