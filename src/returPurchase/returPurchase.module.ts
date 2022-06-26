import { StockModule } from './../stock/stock.module';
import { ProductModule } from 'src/product/product.module';
import { AuthModule } from './../auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';
import {
  returPurchaseDetailProviders,
  returPurchaseProviders,
} from './returPurchase.provider';
import { ReturPurchaseService } from './returPurchase.service';
import { ReturPurchaseController } from './returPurchase.controller';

@Module({
  imports: [DatabaseModule, AuthModule, StockModule, ProductModule],
  controllers: [ReturPurchaseController],
  providers: [
    ...returPurchaseProviders,
    ...returPurchaseDetailProviders,
    ReturPurchaseService,
  ],
})
export class ReturPurchaseModule {}
