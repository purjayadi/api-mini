import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;
}

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {}
