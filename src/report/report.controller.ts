import { PermissionAction } from '../auth/casl.ability.factory';
import { PermissionsGuard } from '../auth/permission.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { IResponse } from 'src/interface/response.interface';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { CheckPermissions } from 'src/auth/permission.decorator';
import { ReportService } from './report.service';
import { reportDto } from './report.dto';

@Controller('report')
export class ReportController {
  constructor(private readonly service: ReportService) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPermissions([PermissionAction.READ, 'Accounting'])
  @Get('/kas')
  findAll(@Query() payload: reportDto): Promise<IResponse> {
    return this.service.findAll(payload);
  }
}
