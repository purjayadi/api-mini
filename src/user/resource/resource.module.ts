import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ResourceController } from './resource.controller';
import { resourceProviders } from './resource.provider';
import { ResourceService } from './resource.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ResourceController],
  providers: [...resourceProviders, ResourceService],
  exports: [ResourceService],
})
export class ResourceModule {}
