"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const city_entity_1 = require("../../address/entities/city.entity");
class CitySeeder {
    async run(dataSource) {
        const repository = dataSource.getRepository(city_entity_1.City);
        await repository.insert([
            {
                id: 261,
                name: 'MATARAM',
                provinceId: 18,
            },
            {
                id: 262,
                name: 'DOMPU',
                provinceId: 18,
            },
            {
                id: 263,
                name: 'SUMBAWA BARAT',
                provinceId: 18,
            },
            {
                id: 264,
                name: 'SUMBAWA',
                provinceId: 18,
            },
            {
                id: 265,
                name: 'LOMBOK TENGAH',
                provinceId: 18,
            },
            {
                id: 266,
                name: 'LOMBOK TIMUR',
                provinceId: 18,
            },
            {
                id: 267,
                name: 'LOMBOK UTARA',
                provinceId: 18,
            },
            {
                id: 268,
                name: 'LOMBOK BARAT',
                provinceId: 18,
            },
            {
                id: 269,
                name: 'BIMA',
                provinceId: 18,
            },
        ]);
    }
}
exports.default = CitySeeder;
//# sourceMappingURL=city.seeder.js.map