import { WarehouseRepository } from './../repository/warehouse.repository';
import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Warehouse]),
  ],
  controllers: [WarehouseController],
  providers: [
    {
      provide: 'WarehouseRepositoryInterface',
      useClass: WarehouseRepository,
    },
    WarehouseService
  ]
})
export class WarehouseModule { }
