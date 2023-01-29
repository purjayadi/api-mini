import { SupplierBankService } from './supplierBank.service';
import { DatabaseModule } from './../database/database.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { SupplierBankController } from './supplierBank.controller';
import { supplierBankProviders } from './supplierBank.provider';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [SupplierBankController],
  providers: [...supplierBankProviders, SupplierBankService],
})
export class SupplierBankModule {}
