import { CustomerRepository } from './../repository/customer.repository';
import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [
    {
      provide: 'CustomerRepositoryInterface',
      useClass: CustomerRepository,
    },
    CustomerService
  ]
})
export class CustomerModule { }
