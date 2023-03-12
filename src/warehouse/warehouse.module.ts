import { AuthModule } from './../auth/auth.module';
import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { warehouseProviders } from './warehouse.provider';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [WarehouseController],
  providers: [...warehouseProviders, WarehouseService],
})
export class WarehouseModule {}
