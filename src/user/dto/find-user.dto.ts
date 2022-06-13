import { IsOptional, IsString } from "class-validator";

export class FindUserDto {
    @IsOptional()
    public readonly limit: number;

    @IsOptional()
    public readonly offset: number;

    @IsString()
    @IsOptional()
    public readonly query: string;

}