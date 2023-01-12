import { Repository } from 'typeorm';
import { IResponse } from '../utils/interfaces/response.interface';
import { SupplierBankAccount } from './entities/supplierBankAccount.entity';
import { CreateSupplierBankDto, FindSupplierBankDto } from './supplierBank.dto';
export declare class SupplierBankService {
    private readonly repository;
    constructor(repository: Repository<SupplierBankAccount>);
    findAll(payload: FindSupplierBankDto): Promise<IResponse>;
    create(payload: CreateSupplierBankDto): Promise<IResponse>;
    findOne(id: string): Promise<IResponse>;
    update(id: string, payload: Partial<CreateSupplierBankDto>): Promise<IResponse>;
    remove(id: string): Promise<IResponse>;
}
