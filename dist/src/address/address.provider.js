"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subDistrictProviders = exports.districtProviders = exports.cityProviders = void 0;
const subDistrict_entity_1 = require("./entities/subDistrict.entity");
const district_entity_1 = require("./entities/district.entity");
const city_entity_1 = require("./entities/city.entity");
exports.cityProviders = [
    {
        provide: 'CITY_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(city_entity_1.City),
        inject: ['DATA_SOURCE'],
    },
];
exports.districtProviders = [
    {
        provide: 'DISTRICT_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(district_entity_1.District),
        inject: ['DATA_SOURCE'],
    },
];
exports.subDistrictProviders = [
    {
        provide: 'SUB_DISTRICT_REPOSITORY',
        useFactory: (dataSource) => dataSource.getRepository(subDistrict_entity_1.SubDistrict),
        inject: ['DATA_SOURCE'],
    },
];
//# sourceMappingURL=address.provider.js.map