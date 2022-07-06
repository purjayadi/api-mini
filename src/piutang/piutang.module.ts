import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { piutangProviders } from './piutang.provider';
import { PiutangService } from './piutang.service';
import { PiutangController } from './piutang.controller';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [PiutangController],
  providers: [...piutangProviders, PiutangService],
})
export class PiutangModule {}
