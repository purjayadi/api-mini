import { IPagination } from './../utils/interfaces/request.interface';
import { IResponse } from './../utils/interfaces/response.interface';
import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, Req, Logger } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { FindEmployeeDto } from './dto/find-employee.dto';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly service: EmployeeService) { }

  @Get()
  findAll(@Query() payload: FindEmployeeDto): Promise<IResponse> {
    return this.service.findAll(payload);
  }


  @Post()
  create(@Body() payload: CreateEmployeeDto) {
    return this.service.create(payload);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.service.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
