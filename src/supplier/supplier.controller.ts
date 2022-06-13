import { IResponse } from '../utils/interfaces/response.interface';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { FindSupplierDto } from './dto/find-supplier.dto';

@Controller('supplier')
export class SupplierController {
  constructor(private readonly supplierService: SupplierService) { }

  @Post()
  create(@Body() createSupplierDto: CreateSupplierDto) {
    return this.supplierService.create(createSupplierDto);
  }

  @Get()
  findAll(@Query() payload: FindSupplierDto): Promise<IResponse> {
    return this.supplierService.findAll(payload);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.supplierService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
    return this.supplierService.update(id, updateSupplierDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.supplierService.remove(id);
  }
}
