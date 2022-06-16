import { Repository } from 'typeorm';
import { IResponse } from './../utils/interfaces/response.interface';
import { Inject, Injectable, HttpStatus } from '@nestjs/common';
import { City } from './entities/city.entity';
import { District } from './entities/district.entity';
import { SubDistrict } from './entities/subDistrict.entity';

@Injectable()
export class AddressService {
  constructor(
    @Inject('CITY_REPOSITORY')
    private readonly city: Repository<City>,

    @Inject('DISTRICT_REPOSITORY')
    private readonly district: Repository<District>,

    @Inject('SUB_DISTRICT_REPOSITORY')
    private readonly repository: Repository<SubDistrict>,
  ) {}

  async findCity(): Promise<IResponse> {
    try {
      const cities = await this.city.find();
      return { data: cities, error: null, status: HttpStatus.OK };
    } catch (error) {
      return {
        message: 'Unable to get employee',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async findDistrict(cityId: number): Promise<IResponse> {
    try {
      const districts = await this.district.findBy({
        cityId: cityId,
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

  async findSubDistrict(districtId: number): Promise<IResponse> {
    try {
      const subDistricts = await this.repository.findBy({
        districtId: districtId,
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
