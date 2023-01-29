import { IResponse } from '../utils/interfaces/response.interface';
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
import { SupplierBankService } from './supplierBank.service';
import { CreateSupplierBankDto, FindSupplierBankDto } from './supplierBank.dto';

@Controller('supplier-bank')
export class SupplierBankController {
  constructor(private readonly service: SupplierBankService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.CREATE, 'Supplier'])
  @Post()
  create(@Body() payload: CreateSupplierBankDto) {
    return this.service.create(payload);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.READ, 'Supplier'])
  @Get()
  findAll(@Query() payload: FindSupplierBankDto): Promise<IResponse> {
    return this.service.findAll(payload);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.READ, 'Supplier'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.UPDATE, 'Supplier'])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() payload: Partial<CreateSupplierBankDto>,
  ) {
    return this.service.update(id, payload);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.DELETE, 'Supplier'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
