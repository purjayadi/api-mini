import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FindSupplierBankDto {
  @IsOptional()
  public readonly limit: number;

  @IsOptional()
  public readonly offset: number;

  @IsString()
  @IsOptional()
  public readonly query: string;
}

export class CreateSupplierBankDto {
  @IsString()
  @IsNotEmpty()
  public readonly supplierId: string;

  @IsInt()
  @IsNotEmpty()
  public readonly code: number;

  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsInt()
  @IsNotEmpty()
  public readonly account: number;
}
