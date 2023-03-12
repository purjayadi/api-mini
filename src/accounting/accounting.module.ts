import { Module } from '@nestjs/common';
import { AccountingService } from './accounting.service';
import { AccountingController } from './accounting.controller';
import { cashFlowProviders, kasProviders } from './accounting.provider';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [AccountingController],
  providers: [...kasProviders, ...cashFlowProviders, AccountingService],
  exports: [AccountingService],
})
export class AccountingModule {}
