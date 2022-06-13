import { FindDto } from './../utils/dto/find.dto';
import { WarehouseService } from './warehouse.service';
import { IResponse } from '../utils/interfaces/response.interface';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly service: WarehouseService) { }

  @Post()
  create(@Body() payload: CreateWarehouseDto) {
    return this.service.create(payload);
  }

  @Get()
  findAll(@Query() payload: FindDto): Promise<IResponse> {
    return this.service.findAll(payload);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateWarehouseDto) {
    return this.service.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
