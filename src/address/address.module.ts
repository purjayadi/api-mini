import { SubDistrict } from './entities/subDistrict.entity';
import { District } from './entities/district.entity';
import {
  CityRepository,
  DistrictRepository,
  SubDistrictRepository,
} from './../repository/address.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';

@Module({
  imports: [TypeOrmModule.forFeature([City, District, SubDistrict])],
  controllers: [AddressController],
  providers: [
    {
      provide: 'CityRepositoryInterface',
      useClass: CityRepository,
    },
    {
      provide: 'DistrictRepositoryInterface',
      useClass: DistrictRepository,
    },
    {
      provide: 'SubDistrictRepositoryInterface',
      useClass: SubDistrictRepository,
    },
    AddressService,
  ],
})
export class AddressModule {}
