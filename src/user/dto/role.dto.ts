import { IsArray, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}
