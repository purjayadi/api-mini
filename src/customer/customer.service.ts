import { FilterDto } from './../dto/filters.dto';
import { paginateResponse } from 'src/utils/hellper';
import { Like, Repository } from 'typeorm';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import {
  HttpStatus,
  Inject,
  Injectable,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @Inject('CUSTOMER_REPOSITORY')
    private readonly repository: Repository<Customer>,
  ) {}

  async findAll(payload: FilterDto): Promise<IResponse | IPaginate> {
    try {
      const { offset, limit, search } = payload;
      const customers = await this.repository.findAndCount({
        ...(limit && { take: limit }),
        ...(offset && { skip: (offset - 1) * limit }),
        ...(search && {
          where: [
            {
              customerNumber: Like(`%${search}%`),
            },
            {
              name: Like(`%${search}%`),
            },
            {
              shopName: Like(`%${search}%`),
            },
            {
              phone: Like(`%${search}%`),
            },
          ],
        }),
        order: { customerNumber: 'DESC' },
      });
      return paginateResponse(customers, offset, limit, null, HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(payload: CreateCustomerDto): Promise<IResponse> {
    try {
      const data = await this.repository.find({
        order: { code: 'DESC' },
        take: 1,
        skip: 0,
        withDeleted: true,
      });
      const saveCustomer = this.repository.create({
        ...payload,
        code: data[0]?.code ? data[0].code : 0,
      });
      await this.repository.save(saveCustomer);
      return {
        message: 'Create customer successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<IResponse> {
    try {
      const customer = await this.repository.findOneBy({ id });
      if (!customer) {
        throw new NotFoundException('Customer not found');
      }
      return { data: customer, error: null, status: HttpStatus.OK };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, payload: UpdateCustomerDto): Promise<IResponse> {
    try {
      const customer = await this.repository.findOneBy({ id });
      if (!customer) {
        throw new NotFoundException('Customer not found');
      }
      await this.repository.update(id, payload);
      return {
        message: 'Update customer successfully',
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

  async delete(id: string): Promise<IResponse> {
    try {
      const customer = await this.repository.findOneBy({ id });
      if (!customer) {
        throw new NotFoundException('Customer not found');
      }
      await this.repository.delete(id);
      return {
        message: 'Delete customer successfully',
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
