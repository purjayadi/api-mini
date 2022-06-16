import { SubDistrict } from './entities/subDistrict.entity';
import { District } from './entities/district.entity';
import { City } from './entities/city.entity';
import { DataSource } from 'typeorm';

export const cityProviders = [
  {
    provide: 'CITY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(City),
    inject: ['DATA_SOURCE'],
  },
];

export const districtProviders = [
  {
    provide: 'DISTRICT_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(District),
    inject: ['DATA_SOURCE'],
  },
];

export const subDistrictProviders = [
  {
    provide: 'SUB_DISTRICT_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SubDistrict),
    inject: ['DATA_SOURCE'],
  },
];
