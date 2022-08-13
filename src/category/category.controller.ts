import { FilterDto } from './../dto/filters.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PermissionAction } from 'src/auth/casl.ability.factory';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CheckPermissions } from 'src/auth/permission.decorator';
import { PermissionsGuard } from 'src/auth/permission.guard';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.READ, 'Product'])
  @Get()
  findAll(@Query() payload: FilterDto): Promise<IResponse | IPaginate> {
    return this.service.findAll(payload);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.CREATE, 'Product'])
  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.service.create(payload);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.READ, 'Product'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.UPDATE, 'Product'])
  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCategoryDto) {
    return this.service.update(id, payload);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.DELETE, 'Product'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
