import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateWarehouseDto {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumberString()
  @IsNotEmpty()
  phone: string;
}
