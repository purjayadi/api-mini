import { Optional } from '@nestjs/common';
import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { StatusFormat } from './entities/schedule.entity';

export class findScheduleDto {
  @Optional()
  readonly offset?: number;

  @Optional()
  readonly limit?: number;

  @Optional()
  readonly query?: string;
}

export class CreateScheduleDto {
  @IsNotEmpty()
  @IsDateString()
  readonly date?: Date;

  @IsNotEmpty()
  readonly customerId?: string;

  @IsString()
  @IsNotEmpty()
  readonly employeeId?: string;

  @IsNotEmpty()
  readonly description?: string;

  @IsOptional()
  @IsNotEmpty()
  readonly status?: StatusFormat;

  @IsArray()
  @IsNotEmpty()
  readonly scheduleDetails?: any;
}

export class ScheduleDetailDto {
  @IsNotEmpty()
  readonly scheduleId?: string;

  @IsNotEmpty()
  readonly productId?: string;

  @IsNotEmpty()
  readonly unitId?: string;

  @IsNotEmpty()
  readonly quantity?: number;
}

export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {}
