import { AddressService } from './address.service';
import { IResponse } from './../utils/interfaces/response.interface';
export declare class AddressController {
    private readonly service;
    constructor(service: AddressService);
    findAll(): Promise<IResponse>;
    findDistrict(cityId: number): Promise<IResponse>;
    findSubDistrict(districtId: number): Promise<IResponse>;
}
