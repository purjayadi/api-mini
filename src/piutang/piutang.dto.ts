import { IsNumber } from 'class-validator';
import {
  IsDateString,
  IsDecimal,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class findPiutang {
  @IsString()
  @IsNotEmpty()
  public readonly customer: string;

  @IsDateString()
  @IsOptional()
  public readonly dueDate: Date;
}

export class IncDecDTO {
  @IsString()
  @IsNotEmpty()
  public readonly id: string;

  @IsNumber()
  @IsNotEmpty()
  public readonly amount: number;
}

export class PaymentDTO {
  @IsDateString()
  @IsNotEmpty()
  public readonly date: Date;

  @IsString()
  @IsNotEmpty()
  public readonly note: string;

  @IsString()
  @IsNotEmpty()
  public readonly piutangId: string;

  @IsString()
  @IsNotEmpty()
  public readonly paymentMethod: string;

  @IsString()
  @IsNotEmpty()
  public readonly userId: string;

  @IsNumber()
  @IsNotEmpty()
  public readonly amount: number;

  @IsString()
  @IsOptional()
  public readonly categoryId: string;
}

export class PiutangDTO {
  @IsString()
  @IsNotEmpty()
  public readonly piutangId: string;

  @IsDecimal()
  @IsNotEmpty()
  public readonly amount: string;
}
