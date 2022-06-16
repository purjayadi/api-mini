import { Employee } from '../employee/entities/employee.entity';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeRepositoryInterface } from './interface/employee.repository.interface';

@Injectable()
export class EmployeeRepository
  extends BaseAbstractRepository<Employee>
  implements EmployeeRepositoryInterface
{
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {
    super(employeeRepository);
  }
}
