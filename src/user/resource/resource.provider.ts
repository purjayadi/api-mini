import { DataSource } from 'typeorm';
import { Resource } from '../entities/resource.entity';

export const resourceProviders = [
  {
    provide: 'RESOURCE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Resource),
    inject: ['DATA_SOURCE'],
  },
];
