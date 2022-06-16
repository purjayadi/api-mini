import { AuthModule } from './../auth/auth.module';
import {
  ProductRepository,
  UnitRepository,
} from './../repository/product.repository';
import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from './entities/unit.entity';
import { UnitController } from './unit/unit.controller';
import { UnitService } from './unit/unit.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Product, Unit])],
  controllers: [ProductController, UnitController],
  providers: [
    {
      provide: 'ProductRepositoryInterface',
      useClass: ProductRepository,
    },
    {
      provide: 'UnitRepositoryInterface',
      useClass: UnitRepository,
    },
    ProductService,
    UnitService,
  ],
})
export class ProductModule {}
