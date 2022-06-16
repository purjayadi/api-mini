import { DatabaseModule } from './../database/database.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { purchaseOrderLine, purchaseProviders } from './purchase.provider';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [PurchaseController],
  providers: [...purchaseProviders, ...purchaseOrderLine, PurchaseService],
})
export class PurchaseModule {}
