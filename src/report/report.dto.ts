import { IsDateString, IsNotEmpty } from 'class-validator';

export class reportDto {
  @IsDateString()
  @IsNotEmpty()
  public readonly startDate: Date;

  @IsDateString()
  @IsNotEmpty()
  public readonly endDate: Date;
}
