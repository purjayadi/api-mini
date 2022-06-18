import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { orderProviders } from './order.provider';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [OrderController],
  providers: [...orderProviders, OrderService],
})
export class OrderModule {}
