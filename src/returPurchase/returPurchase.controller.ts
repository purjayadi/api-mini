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
import { ReturPurchaseService } from './returPurchase.service';
import {
  CreateReturPurchaseDto,
  UpdateReturPurchaseDTO,
} from './returPurchase.dto';

@Controller('retur-purchase')
export class ReturPurchaseController {
  constructor(private readonly service: ReturPurchaseService) {}

  // @UseGuards(JwtAuthGuard, PermissionsGuard)
  // @CheckPermissions([PermissionAction.READ, 'Retur Purchase'])
  @Get()
  findAll(@Query() payload: FilterDto): Promise<IResponse | IPaginate> {
    return this.service.findAll(payload);
  }

  // @UseGuards(JwtAuthGuard, PermissionsGuard)
  // @CheckPermissions([PermissionAction.CREATE, 'Retur Purchase'])
  @Post()
  create(@Body() payload: CreateReturPurchaseDto) {
    return this.service.create(payload);
  }

  // @UseGuards(JwtAuthGuard, PermissionsGuard)
  // @CheckPermissions([PermissionAction.READ, 'Retur Purchase'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  // @UseGuards(JwtAuthGuard, PermissionsGuard)
  // @CheckPermissions([PermissionAction.UPDATE, 'Retur Purchase'])
  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateReturPurchaseDTO) {
    return this.service.update(id, payload);
  }

  // @UseGuards(JwtAuthGuard, PermissionsGuard)
  // @CheckPermissions([PermissionAction.DELETE, 'Retur Purchase'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
