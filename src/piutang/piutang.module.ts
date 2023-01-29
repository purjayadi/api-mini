import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { piutangProviders } from './piutang.provider';
import { PiutangService } from './piutang.service';
import { PiutangController } from './piutang.controller';
import { kasProviders } from '../accounting/accounting.provider';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [PiutangController],
  providers: [...kasProviders, ...piutangProviders, PiutangService],
  exports: [PiutangService],
})
export class PiutangModule {}
