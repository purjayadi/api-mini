import { paginateResponse } from 'src/utils/hellper';
import { Repository } from 'typeorm';
import { randomNumber } from './../utils/hellper';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { FindEmployeeDto } from './dto/find-employee.dto';
import {
  Inject,
  Injectable,
  HttpStatus,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject('EMPLOYEE_REPOSITORY')
    private readonly repository: Repository<Employee>,
  ) {}

  async findAll(payload: FindEmployeeDto): Promise<IResponse | IPaginate> {
    try {
      const { offset, limit } = payload;
      const employees = await this.repository.findAndCount({
        ...(limit && { take: limit }),
        ...(offset && { skip: (offset - 1) * limit }),
      });
      return paginateResponse(employees, offset, limit, null, HttpStatus.OK);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(payload: CreateEmployeeDto): Promise<IResponse> {
    try {
      const count = await this.repository.count();
      const number = randomNumber(10000, 99999);
      const code = 'NIP-' + (count + number + 1);
      await this.repository.save({
        ...payload,
        code: code,
      });
      return {
        message: 'Create employee successfully',
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

  async findOne(id: string): Promise<IResponse> {
    try {
      const employee = await this.repository.findOneBy({ id });
      if (!employee) {
        throw new NotFoundException('Employee not found');
      }
      return { data: employee, error: null, status: HttpStatus.OK };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, payload: UpdateEmployeeDto): Promise<IResponse> {
    try {
      const plan = await this.repository.findOneBy({ id });
      if (!plan) {
        throw new NotFoundException('Employee not found');
      }
      await this.repository.update(id, payload);
      return {
        message: 'Update employee successfully',
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
      const plan = await this.repository.findOneBy({ id });
      if (!plan) {
        throw new NotFoundException('Employee not found');
      }
      await this.repository.delete({ id });
      return {
        message: 'Delete employee successfully',
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
