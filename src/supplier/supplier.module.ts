import { AuthModule } from './../auth/auth.module';
import {
  SupplierBankAccountRepository,
  SupplierRepository,
} from '../repository/supplier.repository';
import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Supplier } from './entities/supplier.entity';
import { SupplierBankAccount } from './entities/supplierBankAccount.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Supplier, SupplierBankAccount]),
  ],
  controllers: [SupplierController],
  providers: [
    {
      provide: 'SupplierRepositoryInterface',
      useClass: SupplierRepository,
    },
    {
      provide: 'SupplierBankAccountRepositoryInterface',
      useClass: SupplierBankAccountRepository,
    },
    SupplierService,
  ],
})
export class SupplierModule {}
