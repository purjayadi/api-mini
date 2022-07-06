import {
  IsDateString,
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
  public readonly orderId: string;

  @IsString()
  @IsNotEmpty()
  public readonly amount: string;
}
