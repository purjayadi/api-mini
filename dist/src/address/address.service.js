"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
let AddressService = class AddressService {
    constructor(city, district, repository) {
        this.city = city;
        this.district = district;
        this.repository = repository;
    }
    async findCity() {
        try {
            const cities = await this.city.find();
            return { data: cities, error: null, status: common_1.HttpStatus.OK };
        }
        catch (error) {
            return {
                message: 'Unable to get employee',
                error: error.message,
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async findDistrict(cityId) {
        try {
            const districts = await this.district.findBy({
                cityId: cityId,
            });
            return { data: districts, error: null, status: common_1.HttpStatus.OK };
        }
        catch (error) {
            return {
                message: 'Unable to get employee',
                error: error.message,
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
    async findSubDistrict(districtId) {
        try {
            const subDistricts = await this.repository.findBy({
                districtId: districtId,
            });
            return { data: subDistricts, error: null, status: common_1.HttpStatus.OK };
        }
        catch (error) {
            return {
                message: 'Unable to get employee',
                error: error.message,
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            };
        }
    }
};
AddressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('CITY_REPOSITORY')),
    __param(1, (0, common_1.Inject)('DISTRICT_REPOSITORY')),
    __param(2, (0, common_1.Inject)('SUB_DISTRICT_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], AddressService);
exports.AddressService = AddressService;
//# sourceMappingURL=address.service.js.map