import { UnitModule } from './../unit/unit.module';
import { DatabaseModule } from './../database/database.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { productProviders } from './product.provider';

@Module({
  imports: [AuthModule, DatabaseModule, UnitModule],
  controllers: [ProductController],
  providers: [...productProviders, ProductService],
})
export class ProductModule {}
