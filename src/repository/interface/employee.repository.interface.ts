import { Employee } from '../../employee/entities/employee.entity';
import { BaseInterfaceRepository } from '../base/base.interface.repository';

export type EmployeeRepositoryInterface = BaseInterfaceRepository<Employee>;
