import { IsBoolean, IsDateString, IsOptional } from 'class-validator';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { GenderFormat, StatusFormat } from '../entities/employee.entity';
export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsString()
  public readonly email: string;

  @IsString()
  @IsNotEmpty()
  public readonly phone: string;

  @IsString()
  @IsNotEmpty()
  public readonly address: string;

  @IsEnum(['male', 'female'])
  @IsNotEmpty()
  public readonly gender: GenderFormat;

  @IsString()
  @IsOptional()
  public readonly photo: string;

  @IsDateString()
  @IsNotEmpty()
  public readonly joinDate: Date;

  @IsEnum(['single', 'married'])
  @IsNotEmpty()
  public readonly status: StatusFormat;

  @IsBoolean()
  @IsOptional()
  public readonly isActive: boolean;
}
