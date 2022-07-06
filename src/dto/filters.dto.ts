import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

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
  public readonly dueDate: Date;
}
