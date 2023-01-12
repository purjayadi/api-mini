import { typeFormat } from 'src/accounting/entities/cashFlow.entity';
export declare class CreateKasDto {
    date: Date;
    source: string;
    debit: number;
    credit: number;
    description: string;
}
declare const UpdateKasDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateKasDto>>;
export declare class UpdateKasDto extends UpdateKasDto_base {
}
export declare class CreateCashFlowDto {
    date: Date;
    type: typeFormat;
    amount: number;
    employeeId: string;
    description: string;
    categoryId: string;
    toCategoryId: string;
}
declare const UpdateCashFlowDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateCashFlowDto>>;
export declare class UpdateCashFlowDto extends UpdateCashFlowDto_base {
}
export {};
