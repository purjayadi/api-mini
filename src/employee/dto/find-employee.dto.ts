import { IsInt, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class FindEmployeeDto {
    @IsOptional()
    public readonly limit: number;

    @IsOptional()
    public readonly offset: number;

    @IsString()
    @IsOptional()
    public readonly query: string;
}