import { SupplierBankAccount } from './entities/supplierBankAccount.entity';
import { DataSource } from 'typeorm';

export const supplierBankProviders = [
  {
    provide: 'SUPPLIER_BANK_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SupplierBankAccount),
    inject: ['DATA_SOURCE'],
  },
];
