import { IResponse } from '../utils/interfaces/response.interface';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductDto } from './dto/find-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productService.create(payload);
  }

  @Get()
  findAll(@Query() payload: FindProductDto): Promise<IResponse> {
    return this.productService.findAll(payload);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateProductDto) {
    return this.productService.update(id, payload);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
