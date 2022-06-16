import { Controller, Get, Query } from '@nestjs/common';
import { ResourceService } from './resource.service';

@Controller('resource')
export class ResourceController {
  constructor(private readonly service: ResourceService) {}

  @Get()
  findAll(@Query() payload: any) {
    return this.service.findAll(payload);
  }
}
