import { Repository } from 'typeorm';
import { IResponse } from './../utils/interfaces/response.interface';
import { City } from './entities/city.entity';
import { District } from './entities/district.entity';
import { SubDistrict } from './entities/subDistrict.entity';
export declare class AddressService {
    private readonly city;
    private readonly district;
    private readonly repository;
    constructor(city: Repository<City>, district: Repository<District>, repository: Repository<SubDistrict>);
    findCity(): Promise<IResponse>;
    findDistrict(cityId: number): Promise<IResponse>;
    findSubDistrict(districtId: number): Promise<IResponse>;
}
