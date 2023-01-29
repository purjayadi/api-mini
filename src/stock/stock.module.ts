import { stockProviders } from './stock.provider';
import { DatabaseModule } from './../database/database.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockController } from './stock.controller';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [StockController],
  providers: [...stockProviders, StockService],
  exports: [StockService, ...stockProviders],
})
export class StockModule {}
