import { CaslAbilityFactory } from './../auth/casl.ability.factory';
import { AuthModule } from './../auth/auth.module';
import { CustomerRepository } from './../repository/customer.repository';
import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Customer])],
  controllers: [CustomerController],
  providers: [
    {
      provide: 'CustomerRepositoryInterface',
      useClass: CustomerRepository,
    },
    CustomerService,
  ],
})
export class CustomerModule {}
