import { DatabaseModule } from './../database/database.module';
import { Module } from '@nestjs/common';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import {
  cityProviders,
  districtProviders,
  subDistrictProviders,
} from './address.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [AddressController],
  providers: [
    ...cityProviders,
    ...districtProviders,
    ...subDistrictProviders,
    AddressService,
  ],
})
export class AddressModule {}
