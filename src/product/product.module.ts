import { StockModule } from './../stock/stock.module';
import { UnitModule } from './../unit/unit.module';
import { DatabaseModule } from './../database/database.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { productPriceProviders, productProviders } from './product.provider';

@Module({
  imports: [AuthModule, DatabaseModule, UnitModule, StockModule],
  controllers: [ProductController],
  providers: [...productProviders, ...productPriceProviders, ProductService],
  exports: [ProductService],
})
export class ProductModule {}
