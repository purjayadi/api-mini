import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSupplierDto {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsString()
  @IsNotEmpty()
  public readonly address: string;

  @IsString()
  @IsNotEmpty()
  public readonly phone: string;

  @IsEmail()
  @IsNotEmpty()
  public readonly email: string;

  @IsString()
  @IsOptional()
  public readonly website: string;

  @IsArray()
  @IsOptional()
  public readonly supplierBankAccount: any;
}
