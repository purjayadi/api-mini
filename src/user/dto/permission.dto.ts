import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  @IsNotEmpty()
  public readonly action: string;

  @IsString()
  @IsNotEmpty()
  public readonly resourceId: string;
}
