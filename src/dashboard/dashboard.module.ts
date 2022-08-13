import { orderDetailProviders } from './../order/order.provider';
import { scheduleProviders } from './../schedule/schedule.provider';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { customerProviders } from 'src/customer/customer.provider';
import { orderProviders } from 'src/order/order.provider';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [DashboardController],
  providers: [
    ...scheduleProviders,
    ...customerProviders,
    ...orderProviders,
    ...orderDetailProviders,
    DashboardService,
  ],
})
export class DashboardModule {}
