import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';
import { PaymentMethod } from './entities/order.entity';
import { Status } from './entities/order.entity';

export class FindOrderDto {
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
  public readonly query: string;

  // @IsBoolean()
  @IsOptional()
  public readonly withDeleted: string;

  @IsOptional()
  public readonly orderBy: string;

  @IsOptional()
  public readonly order: string;

  @IsOptional()
  public readonly search: string;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsDateString()
  date: Date;

  @IsNotEmpty()
  @IsString()
  customerId: string;

  @IsNotEmpty()
  @IsString()
  employeeId: string;

  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ValidateIf((o) => o.paymentMethod === 'Due Date')
  @IsNotEmpty()
  @IsDateString()
  dueDate: Date;

  @IsNotEmpty()
  total: number;

  @IsNotEmpty()
  orderDetails: OrderDetail[];

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  payment: number;

  @IsString()
  @IsOptional()
  status: Status;
}

export class UpdateOrderDto extends PartialType(CreateOrderDto) {}

export class OrderDetail {
  @IsNotEmpty()
  @IsString()
  orderId: string;

  @IsNotEmpty()
  @IsString()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  discount: number;

  @IsNotEmpty()
  @IsNumber()
  subTotal: number;

  @IsNotEmpty()
  @IsString()
  unitId: string;

  @IsNotEmpty()
  @IsArray()
  product: any;
}
