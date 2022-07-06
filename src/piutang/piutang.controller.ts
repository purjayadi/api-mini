import { FilterDto } from './../dto/filters.dto';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { PermissionAction } from 'src/auth/casl.ability.factory';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CheckPermissions } from 'src/auth/permission.decorator';
import { PermissionsGuard } from 'src/auth/permission.guard';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { PiutangService } from './piutang.service';
import { findPiutang } from './piutang.dto';

@Controller('piutang')
export class PiutangController {
  constructor(private readonly service: PiutangService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.READ, 'Piutang'])
  @Get()
  findAll(@Query() payload: FilterDto): Promise<IResponse | IPaginate> {
    return this.service.findAll(payload);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.READ, 'Piutang'])
  @Get('find')
  findPiutangByCustomer(@Query() payload: findPiutang): Promise<IResponse> {
    return this.service.findPiutangByCustomer(payload);
  }
}
