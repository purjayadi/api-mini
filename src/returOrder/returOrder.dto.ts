import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateReturOrderDTO {
  @IsDateString()
  @IsNotEmpty()
  public readonly date: Date;

  @IsNumber()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  public readonly total: number;

  @IsString()
  @IsNotEmpty()
  public readonly customerId: string;

  @IsString()
  @IsNotEmpty()
  public readonly userId: string;

  @IsString()
  @IsOptional()
  public readonly description: string;

  @IsArray()
  @IsNotEmpty()
  public readonly returOrderDetails: ReturDetailDto[];
}

export class ReturDetailDto {
  @IsString()
  @IsNotEmpty()
  public readonly returOrderId: string;

  @IsString()
  @IsNotEmpty()
  public readonly productId: string;

  @IsNumber()
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  public readonly quantity: number;

  @IsString()
  @IsNotEmpty()
  public readonly unitId: string;

  @IsNumber()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  public readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  public readonly subTotal: number;
}

export class UpdateReturOrderDTO extends PartialType(CreateReturOrderDTO) {}
