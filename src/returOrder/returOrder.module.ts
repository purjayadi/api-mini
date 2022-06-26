import { StockModule } from './../stock/stock.module';
import { ProductModule } from 'src/product/product.module';
import { AuthModule } from './../auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';
import {
  returOrderDetailProviders,
  returOrderProviders,
} from './returOrder.providet';
import { ReturOrderService } from './returOrder.service';
import { ReturOrderController } from './returOrder.controller';

@Module({
  imports: [DatabaseModule, AuthModule, StockModule, ProductModule],
  controllers: [ReturOrderController],
  providers: [
    ...returOrderProviders,
    ...returOrderDetailProviders,
    ReturOrderService,
  ],
})
export class ReturOrderModule {}
