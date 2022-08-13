import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class DashboardTransactionDTO {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  public readonly month: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  public readonly year: number;
}
