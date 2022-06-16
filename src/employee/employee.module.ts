import { employeeProviders } from './employee.provider';
import { DatabaseModule } from './../database/database.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [EmployeeController],
  providers: [...employeeProviders, EmployeeService],
})
export class EmployeeModule {}
