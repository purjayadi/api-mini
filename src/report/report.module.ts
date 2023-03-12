import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from '../auth/auth.module';
import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { kasProviders } from 'src/accounting/accounting.provider';
import { ReportService } from './report.service';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [ReportController],
  providers: [...kasProviders, ReportService],
})
export class ReportModule {}
