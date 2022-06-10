import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReturService } from './retur.service';
import { CreateReturDto } from './dto/create-retur.dto';
import { UpdateReturDto } from './dto/update-retur.dto';

@Controller('retur')
export class ReturController {
  constructor(private readonly returService: ReturService) {}

  @Post()
  create(@Body() createReturDto: CreateReturDto) {
    return this.returService.create(createReturDto);
  }

  @Get()
  findAll() {
    return this.returService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.returService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReturDto: UpdateReturDto) {
    return this.returService.update(+id, updateReturDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.returService.remove(+id);
  }
}
