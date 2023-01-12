import { IResponse } from '../utils/interfaces/response.interface';
import { SupplierBankService } from './supplierBank.service';
import { CreateSupplierBankDto, FindSupplierBankDto } from './supplierBank.dto';
export declare class SupplierBankController {
    private readonly service;
    constructor(service: SupplierBankService);
    create(payload: CreateSupplierBankDto): Promise<IResponse>;
    findAll(payload: FindSupplierBankDto): Promise<IResponse>;
    findOne(id: string): Promise<IResponse>;
    update(id: string, payload: Partial<CreateSupplierBankDto>): Promise<IResponse>;
    remove(id: string): Promise<IResponse>;
}
