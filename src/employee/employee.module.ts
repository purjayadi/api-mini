import { AuthModule } from './../auth/auth.module';
import { EmployeeRepository } from './../repository/employee.repository';
import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeeController],
  providers: [
    {
      provide: 'EmployeeRepositoryInterface',
      useClass: EmployeeRepository,
    },
    EmployeeService,
  ],
})
export class EmployeeModule {}
