import { PermissionAction } from './../auth/casl.ability.factory';
import { PermissionsGuard } from './../auth/permission.guard';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
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
import { CheckPermissions } from 'src/auth/permission.decorator';
import { FilterDto } from 'src/dto/filters.dto';
import { CreateCashFlowDto, UpdateCashFlowDto } from 'src/dto/accounting.dto';
import { CashFlowService } from './cashFlow.service';

@Controller('cash-flow')
export class CashFlowController {
  constructor(private readonly service: CashFlowService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.READ, 'Accounting'])
  @Get()
  findAll(@Query() payload: FilterDto): Promise<IResponse | IPaginate> {
    return this.service.findAll(payload);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.CREATE, 'Accounting'])
  @Post()
  create(@Body() payload: CreateCashFlowDto) {
    return this.service.create(payload);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.READ, 'Accounting'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.READ, 'Accounting'])
  @Get('/number/:id')
  findByCode(@Param('id') id: string) {
    return this.service.findCashFlowByCode(id);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.UPDATE, 'Accounting'])
  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCashFlowDto) {
    return this.service.update(id, payload);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.DELETE, 'Accounting'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
