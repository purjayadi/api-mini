import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { typeFormat } from 'src/accounting/entities/cashFlow.entity';

export class CreateKasDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsString()
  source: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  debit: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  credit: number;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export class UpdateKasDto extends PartialType(CreateKasDto) {}

export class CreateCashFlowDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsEnum(typeFormat)
  type: typeFormat;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  amount: number;

  @IsNotEmpty()
  @IsString()
  employeeId: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  categoryId: string;

  @IsOptional()
  @IsString()
  toCategoryId: string;
}

export class UpdateCashFlowDto extends PartialType(CreateCashFlowDto) {}
