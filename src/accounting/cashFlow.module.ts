import { Module } from '@nestjs/common';
import { cashFlowProviders, kasProviders } from './accounting.provider';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from 'src/auth/auth.module';
import { CashFlowService } from './cashFlow.service';
import { CashFlowController } from './cashFlow.controller';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [CashFlowController],
  providers: [...kasProviders, ...cashFlowProviders, CashFlowService],
})
export class CashFlowModule {}
