import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUnitDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}

export class FindUnitDto {
    @IsOptional()
    public readonly limit: number;

    @IsOptional()
    public readonly offset: number;

    @IsString()
    @IsOptional()
    public readonly query: string;
}
