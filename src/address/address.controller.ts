import { AddressService } from './address.service';
import { IResponse } from './../utils/interfaces/response.interface';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('address')
export class AddressController {
    constructor(private readonly service: AddressService) { }

    @Get('city')
    findAll(): Promise<IResponse> {
        return this.service.findCity();
    }

    @Get('district/:id')
    findDistrict(@Param('id') cityId: string): Promise<IResponse> {
        return this.service.findDistrict(cityId);
    }

    @Get('sub-district/:id')
    findSubDistrict(@Param('id') districtId: string): Promise<IResponse> {
        return this.service.findSubDistrict(districtId);
    }

}
