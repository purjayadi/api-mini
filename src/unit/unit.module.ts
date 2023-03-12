import { DatabaseModule } from './../database/database.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { UnitController } from '../unit/unit.controller';
import { UnitService } from '../unit/unit.service';
import { unitProviders } from './unit.provider';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [UnitController],
  providers: [...unitProviders, UnitService],
})
export class UnitModule {}
