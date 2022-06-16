import { Repository } from 'typeorm';
import { IResponse } from '../utils/interfaces/response.interface';
import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { FindCustomerDto } from './dto/find-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private readonly repository: Repository<Customer>,
  ) {}

  async findAll(payload: FindCustomerDto): Promise<IResponse> {
    try {
      const { offset, limit } = payload;
      const employees = await this.repository.find({
        ...(limit && { take: limit }),
        ...(offset && { skip: offset }),
      });

      return { data: employees, error: null, status: HttpStatus.OK };
    } catch (error) {
      return {
        message: 'Unable to get employee',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async create(payload: CreateCustomerDto): Promise<IResponse> {
    try {
      const count = await this.repository.count();
      const code = 'CCP-' + (count + 10000 + 1);
      Logger.debug(code);
      await this.repository.create({
        ...payload,
        code: code,
      });
      return {
        message: 'Create customer successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to create customer',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async findOne(id: string): Promise<IResponse> {
    try {
      const customer = await this.repository.findOneBy({ id });
      if (!customer) {
        return {
          message: 'Customer not Found',
          error: null,
          status: HttpStatus.NOT_FOUND,
        };
      }
      return { data: customer, error: null, status: HttpStatus.OK };
    } catch (error) {
      return {
        message: 'Unable to get customer',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async update(id: string, payload: UpdateCustomerDto): Promise<IResponse> {
    try {
      const customer = await this.repository.findOneBy({ id });
      if (!customer) {
        return {
          data: null,
          error: ['Customer not Found'],
          status: HttpStatus.NOT_FOUND,
        };
      }
      await this.repository.update(id, payload);
      return {
        message: 'Update customer successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to update customer',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async delete(id: string): Promise<IResponse> {
    try {
      const customer = await this.repository.findOneBy({ id });
      if (!customer) {
        return {
          data: null,
          error: ['Customer not Found'],
          status: HttpStatus.NOT_FOUND,
        };
      }
      await this.repository.delete(id);
      return {
        message: 'Delete customer successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to delete customer',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
