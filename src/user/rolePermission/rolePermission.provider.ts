import { RolePermission } from './../entities/rolePermission.entity';
import { DataSource } from 'typeorm';

export const rolePermissionProviders = [
  {
    provide: 'ROLE_PERMISSION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RolePermission),
    inject: ['DATA_SOURCE'],
  },
];
