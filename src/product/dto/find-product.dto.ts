import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class FindProductDto {
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
}
