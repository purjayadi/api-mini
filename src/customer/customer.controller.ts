import { FilterDto } from './../dto/filters.dto';
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
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { FindCustomerDto } from './dto/find-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CheckPermissions } from 'src/auth/permission.decorator';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.CREATE, 'Customer'])
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.READ, 'Customer'])
  @Get()
  findAll(@Query() payload: FilterDto): Promise<IResponse | IPaginate> {
    return this.customerService.findAll(payload);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.READ, 'Customer'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.UPDATE, 'Customer'])
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.DELETE, 'Customer'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.delete(id);
  }
}
