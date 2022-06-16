import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsString()
  @IsNotEmpty()
  public readonly shopName: string;

  @IsString()
  @IsNotEmpty()
  public readonly phone: string;

  @IsString()
  @IsNotEmpty()
  public readonly address: string;

  @IsString()
  @IsOptional()
  public readonly photo: string;

  @IsString()
  @IsNotEmpty()
  public readonly gps: string;

  @IsString()
  @IsOptional()
  public readonly employeeId: string;

  @IsDateString()
  @IsNotEmpty()
  public readonly joinDate: Date;

  @IsInt()
  @IsNotEmpty()
  public readonly cityId: number;

  @IsInt()
  @IsNotEmpty()
  public readonly districtId: number;

  @IsInt()
  @IsNotEmpty()
  public readonly subDistrictId: number;
}
