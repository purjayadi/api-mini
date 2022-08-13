import { PermissionsGuard } from './../auth/permission.guard';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { FilterDto } from 'src/dto/filters.dto';
import { DashboardService } from './dashboard.service';
import { DashboardTransactionDTO } from 'src/dto/dashboard.dto';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly service: DashboardService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get('/schedule')
  findAll(@Query() payload: FilterDto): Promise<IResponse | IPaginate> {
    return this.service.getSchedule(payload);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get('/widget')
  getWidget(): Promise<IResponse | IPaginate> {
    return this.service.getWidget();
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get('/transaction')
  getTransaction(@Query() payload: DashboardTransactionDTO) {
    return this.service.getTransaction(payload);
  }
}
