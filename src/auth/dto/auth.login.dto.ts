import { IsNotEmpty, IsString } from 'class-validator';

export class AuthLoginDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsNotEmpty()
    password: string;
}