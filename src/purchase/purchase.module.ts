import { StockModule } from './../stock/stock.module';
import { DatabaseModule } from './../database/database.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { purchaseOrderLine, purchaseProviders } from './purchase.provider';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [AuthModule, DatabaseModule, StockModule, ProductModule],
  controllers: [PurchaseController],
  providers: [...purchaseProviders, ...purchaseOrderLine, PurchaseService],
})
export class PurchaseModule {}
