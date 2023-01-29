import { Type } from 'class-transformer';
import {
  IsBooleanString,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class FilterDto {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  public readonly limit: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  public readonly offset: number;

  @IsString()
  @IsOptional()
  public readonly search: string;

  @IsString()
  @IsOptional()
  public readonly query: string;

  // @IsBoolean()
  @IsOptional()
  public readonly withDeleted: string;

  @IsOptional()
  public readonly orderBy: string;

  @IsOptional()
  public readonly order: string;

  @IsOptional()
  @IsDateString()
  public readonly dueDate: Date;

  @IsOptional()
  @IsDateString()
  public readonly date: Date;

  @IsOptional()
  @IsDateString()
  public readonly startDate: Date;

  @IsOptional()
  @IsDateString()
  public readonly endDate: Date;

  @IsOptional()
  @IsString()
  public readonly customer: string;

  @IsOptional()
  @IsString()
  public readonly name: string;

  @IsOptional()
  @IsString()
  public readonly customerNumber: string;

  @IsOptional()
  @IsString()
  public readonly invNumber: string;

  @IsOptional()
  @IsString()
  public readonly status: any;

  @IsOptional()
  @IsString()
  public readonly categoryId: string;

  @IsOptional()
  @IsBooleanString()
  public readonly isPaid: any;
}
