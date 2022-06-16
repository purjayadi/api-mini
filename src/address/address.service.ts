import {
  CityRepositoryInterface,
  DistrictRepositoryInterface,
  SubDistrictRepositoryInterface,
} from './../repository/interface/address.repository.interface';
import { IResponse } from './../utils/interfaces/response.interface';
import { Inject, Injectable, HttpStatus } from '@nestjs/common';

@Injectable()
export class AddressService {
  constructor(
    @Inject('CityRepositoryInterface')
    private readonly city: CityRepositoryInterface,

    @Inject('DistrictRepositoryInterface')
    private readonly district: DistrictRepositoryInterface,

    @Inject('SubDistrictRepositoryInterface')
    private readonly repository: SubDistrictRepositoryInterface,
  ) {}

  async findCity(): Promise<IResponse> {
    try {
      const cities = await this.city.findAll();
      return { data: cities, error: null, status: HttpStatus.OK };
    } catch (error) {
      return {
        message: 'Unable to get employee',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async findDistrict(cityId: string): Promise<IResponse> {
    try {
      const districts = await this.district.findWithRelations({
        where: { cityId: cityId },
      });
      return { data: districts, error: null, status: HttpStatus.OK };
    } catch (error) {
      return {
        message: 'Unable to get employee',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async findSubDistrict(districtId: string): Promise<IResponse> {
    try {
      const subDistricts = await this.repository.findWithRelations({
        where: { districtId: districtId },
      });
      return { data: subDistricts, error: null, status: HttpStatus.OK };
    } catch (error) {
      return {
        message: 'Unable to get employee',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
