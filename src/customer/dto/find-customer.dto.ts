import { IsOptional, IsString } from 'class-validator';

export class FindCustomerDto {
  @IsOptional()
  public readonly limit: number;

  @IsOptional()
  public readonly offset: number;

  @IsString()
  @IsOptional()
  public readonly query: string;
}
