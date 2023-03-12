"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const district_entity_1 = require("./../../address/entities/district.entity");
const district_json_1 = __importDefault(require("./district.json"));
class DistrictSeeder {
    async run(dataSource) {
        const repository = dataSource.getRepository(district_entity_1.District);
        await repository.save(district_json_1.default, { chunk: district_json_1.default.length / 1000 });
    }
}
exports.default = DistrictSeeder;
//# sourceMappingURL=district.seeder.js.map