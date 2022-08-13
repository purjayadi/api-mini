import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from './../auth/auth.module';
import { Module } from '@nestjs/common';
import { CategoryProviders } from './category.provider';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  imports: [AuthModule, DatabaseModule],
  controllers: [CategoryController],
  providers: [...CategoryProviders, CategoryService],
})
export class CategoryModule {}
