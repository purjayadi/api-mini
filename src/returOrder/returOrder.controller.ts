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
  Put,
} from '@nestjs/common';
import { PermissionAction } from 'src/auth/casl.ability.factory';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CheckPermissions } from 'src/auth/permission.decorator';
import { PermissionsGuard } from 'src/auth/permission.guard';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { ReturOrderService } from './returOrder.service';
import { CreateReturOrderDTO, UpdateReturOrderDTO } from './returOrder.dto';

@Controller('retur-order')
export class ReturOrderController {
  constructor(private readonly service: ReturOrderService) {}

  // @UseGuards(JwtAuthGuard, PermissionsGuard)
  // @CheckPermissions([PermissionAction.READ, 'Retur Order'])
  @Get()
  findAll(@Query() payload: FilterDto): Promise<IResponse | IPaginate> {
    return this.service.findAll(payload);
  }

  // @UseGuards(JwtAuthGuard, PermissionsGuard)
  // @CheckPermissions([PermissionAction.CREATE, 'Retur Order'])
  @Post()
  create(@Body() payload: CreateReturOrderDTO) {
    return this.service.create(payload);
  }

  // @UseGuards(JwtAuthGuard, PermissionsGuard)
  // @CheckPermissions([PermissionAction.READ, 'Retur Order'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // @UseGuards(JwtAuthGuard, PermissionsGuard)
  // @CheckPermissions([PermissionAction.UPDATE, 'Retur Order'])
  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateReturOrderDTO) {
    return this.service.update(id, payload);
  }

  // @UseGuards(JwtAuthGuard, PermissionsGuard)
  // @CheckPermissions([PermissionAction.DELETE, 'Retur Order'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
