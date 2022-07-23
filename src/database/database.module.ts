import { Module } from '@nestjs/common';
import { DatabaseController } from './database.controller';
import { databaseProviders } from './database.provider';
import { DatabaseService } from './database.service';

@Module({
  providers: [...databaseProviders, DatabaseService],
  controllers: [DatabaseController],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
