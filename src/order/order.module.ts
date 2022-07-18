import { PiutangModule } from './../piutang/piutang.module';
import { ProductModule } from 'src/product/product.module';
import { StockModule } from './../stock/stock.module';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { orderProviders, orderDetailProviders } from './order.provider';
import { piutangProviders } from 'src/piutang/piutang.provider';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    StockModule,
    ProductModule,
    PiutangModule,
  ],
  controllers: [OrderController],
  providers: [
    ...orderProviders,
    ...orderDetailProviders,
    ...piutangProviders,
    OrderService,
  ],
})
export class OrderModule {}
