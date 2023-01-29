import { DatabaseModule } from './../database/database.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { customerProviders } from './customer.provider';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [CustomerController],
  providers: [...customerProviders, CustomerService],
})
export class CustomerModule {}
