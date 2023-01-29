import { FindDto } from './../utils/dto/find.dto';
import { WarehouseService } from './warehouse.service';
import { IResponse, IPaginate } from 'src/interface/response.interface';
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
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { PermissionAction } from 'src/auth/casl.ability.factory';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CheckPermissions } from 'src/auth/permission.decorator';
import { PermissionsGuard } from 'src/auth/permission.guard';

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly service: WarehouseService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.CREATE, 'Warehouse'])
  @Post()
  create(@Body() payload: CreateWarehouseDto) {
    return this.service.create(payload);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.READ, 'Warehouse'])
  @Get()
  findAll(@Query() payload: FindDto): Promise<IResponse | IPaginate> {
    return this.service.findAll(payload);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.READ, 'Warehouse'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.UPDATE, 'Warehouse'])
  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateWarehouseDto) {
    return this.service.update(id, payload);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.DELETE, 'Warehouse'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
