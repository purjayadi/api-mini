import { IsOptional, IsString } from 'class-validator';

export class FilterDto {
  @IsOptional()
  public readonly limit: number;

  @IsOptional()
  public readonly offset: number;

  @IsString()
  @IsOptional()
  public readonly search: string;
}
