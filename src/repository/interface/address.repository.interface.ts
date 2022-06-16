import { SubDistrict } from './../../address/entities/subDistrict.entity';
import { District } from './../../address/entities/district.entity';
import { City } from './../../address/entities/city.entity';
import { BaseInterfaceRepository } from '../base/base.interface.repository';

export type CityRepositoryInterface = BaseInterfaceRepository<City>;
export type DistrictRepositoryInterface = BaseInterfaceRepository<District>;
export type SubDistrictRepositoryInterface =
  BaseInterfaceRepository<SubDistrict>;
