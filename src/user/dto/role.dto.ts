import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @IsOptional()
  public readonly permissions: any;
}

export class AssignPermission {
  @IsNotEmpty()
  permissions: Permission[];
}

export class Permission {
  @IsString()
  @IsNotEmpty()
  public readonly id: string;
}
