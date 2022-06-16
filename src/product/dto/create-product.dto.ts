import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  public readonly purchasePrice: number;

  @IsString()
  @IsNotEmpty()
  public readonly supplierId: string;

  @IsArray()
  @IsOptional()
  public readonly price: JSON;
}
