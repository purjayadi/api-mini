import { SubDistrict } from './../address/entities/subDistrict.entity';
import { District } from './../address/entities/district.entity';
import { CityRepositoryInterface, DistrictRepositoryInterface, SubDistrictRepositoryInterface } from './interface/address.repository.interface';
import { City } from './../address/entities/city.entity';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CityRepository extends BaseAbstractRepository<City> implements CityRepositoryInterface {

    constructor(@InjectRepository(City)
    private readonly cityRepository: Repository<City>,
    ) {
        super(cityRepository);
    }
}

@Injectable()
export class DistrictRepository extends BaseAbstractRepository<District> implements DistrictRepositoryInterface {

    constructor(@InjectRepository(District)
    private readonly districtRepository: Repository<District>,
    ) {
        super(districtRepository);
    }
}

@Injectable()
export class SubDistrictRepository extends BaseAbstractRepository<SubDistrict> implements SubDistrictRepositoryInterface {

    constructor(@InjectRepository(SubDistrict)
    private readonly subDistrictRepository: Repository<SubDistrict>,
    ) {
        super(subDistrictRepository);
    }
}