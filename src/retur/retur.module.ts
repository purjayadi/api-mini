import { Module } from '@nestjs/common';
import { ReturService } from './retur.service';
import { ReturController } from './retur.controller';

@Module({
  controllers: [ReturController],
  providers: [ReturService]
})
export class ReturModule {}
