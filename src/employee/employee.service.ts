import { randomNumber } from './../utils/hellper';
import { IResponse } from './../utils/interfaces/response.interface';
import { EmployeeRepositoryInterface } from './../repository/interface/employee.repository.interface';
import { FindEmployeeDto } from './dto/find-employee.dto';
import { Inject, Injectable, HttpStatus, Logger } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    @Inject('EmployeeRepositoryInterface')
    private readonly repository: EmployeeRepositoryInterface,
  ) {}

  async findAll(payload: FindEmployeeDto): Promise<IResponse> {
    try {
      const { offset, limit } = payload;
      const employees = await this.repository.findWithRelations({
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

  async create(payload: CreateEmployeeDto): Promise<IResponse> {
    try {
      const count = await this.repository.countRecord();
      const number = randomNumber(10000, 99999);
      const code = 'NIP-' + (count + number + 1);
      await this.repository.create({
        ...payload,
        code: code,
      });
      return {
        message: 'Create employee successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to create employee',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async findOne(id: string): Promise<IResponse> {
    try {
      const employee = await this.repository.findOneById(id);
      if (!employee) {
        return {
          message: 'Employee not Found',
          error: null,
          status: HttpStatus.NOT_FOUND,
        };
      }
      return { data: employee, error: null, status: HttpStatus.OK };
    } catch (error) {
      return {
        message: 'Unable to get employee',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async update(id: string, payload: UpdateEmployeeDto): Promise<IResponse> {
    try {
      const plan = await this.repository.findOneById(id);
      if (!plan) {
        return {
          data: null,
          error: ['Employee not Found'],
          status: HttpStatus.NOT_FOUND,
        };
      }
      await this.repository.update(id, payload);
      return {
        message: 'Update employee successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to update employee',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async remove(id: string): Promise<IResponse> {
    try {
      const plan = await this.repository.findOneById(id);
      if (!plan) {
        return {
          data: null,
          error: ['Employee not Found'],
          status: HttpStatus.NOT_FOUND,
        };
      }
      await this.repository.remove(id);
      return {
        message: 'Delete employee successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to delete employee',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
