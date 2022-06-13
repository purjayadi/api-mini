import { IsArray, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    public readonly username: string;

    @IsString()
    @IsNotEmpty()
    public readonly employeeId: string;

    @IsString()
    @IsNotEmpty()
    public readonly password: string;

    @IsArray()
    @IsOptional()
    public readonly roles: string;

}
