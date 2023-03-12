import { AuthModule } from './../auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { scheduleProviders } from './schedule.provider';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [ScheduleController],
  providers: [...scheduleProviders, ScheduleService],
})
export class ScheduleModule {}
