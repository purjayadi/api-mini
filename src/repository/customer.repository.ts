import { Customer } from './../customer/entities/customer.entity';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerRepositoryInterface } from './interface/customer.repository.interface';

@Injectable()
export class CustomerRepository
  extends BaseAbstractRepository<Customer>
  implements CustomerRepositoryInterface
{
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {
    super(customerRepository);
  }
}
