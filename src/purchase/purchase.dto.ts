import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsDateString,
  IsDecimal,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { StatusFormat } from './entities/purchase.entity';

export class CreatePurchaseDto {
  @IsString()
  @IsOptional()
  code: string;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsNumber()
  @IsOptional()
  discount: number;

  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsString()
  @IsOptional()
  status: StatusFormat;

  @IsString()
  @IsNotEmpty()
  supplierId: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  warehouseId: string;

  @IsArray()
  @IsNotEmpty()
  purchaseLines: PurchaseLine[];
}

export class PurchaseLine {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsString()
  @IsNotEmpty()
  unitId: string;

  @IsDecimal()
  @IsNotEmpty()
  price: number;

  @IsDecimal()
  @IsNotEmpty()
  subTotal: number;
}

export class UpdatePurchaseDto extends PartialType(CreatePurchaseDto) {}

export class FindPurchaseDto {
  @IsOptional()
  public readonly limit: number;

  @IsOptional()
  public readonly offset: number;

  @IsString()
  @IsOptional()
  public readonly query: string;
}
