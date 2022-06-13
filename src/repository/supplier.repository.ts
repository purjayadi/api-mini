import { SupplierBankAccount } from '../supplier/entities/supplierBankAccount.entity';
import { Supplier } from '../supplier/entities/supplier.entity';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SupplierRepositoryInterface, SupplierBankAccountRepositoryInterface } from './interface/supplier.repository.interface';

@Injectable()
export class SupplierRepository extends BaseAbstractRepository<Supplier> implements SupplierRepositoryInterface {

    constructor(@InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
    ) {
        super(supplierRepository);
    }
}

@Injectable()
export class SupplierBankAccountRepository extends BaseAbstractRepository<SupplierBankAccount> implements SupplierBankAccountRepositoryInterface {

    constructor(@InjectRepository(SupplierBankAccount)
    private readonly supplierBankAccountRepository: Repository<SupplierBankAccount>,
    ) {
        super(supplierBankAccountRepository);
    }
}