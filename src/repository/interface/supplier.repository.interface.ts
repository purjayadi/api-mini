import { SupplierBankAccount } from './../../supplier/entities/supplierBankAccount.entity';
import { Supplier } from './../../supplier/entities/supplier.entity';
import { BaseInterfaceRepository } from '../base/base.interface.repository';

export type SupplierRepositoryInterface = BaseInterfaceRepository<Supplier>;

export type SupplierBankAccountRepositoryInterface =
  BaseInterfaceRepository<SupplierBankAccount>;
