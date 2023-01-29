import { supplierProviders } from './supplier.provider';
import { DatabaseModule } from './../database/database.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { SupplierBankModule } from 'src/supplierAccount/supplierBank.module';

@Module({
  imports: [AuthModule, DatabaseModule, SupplierBankModule],
  controllers: [SupplierController],
  providers: [...supplierProviders, SupplierService],
})
export class SupplierModule {}
