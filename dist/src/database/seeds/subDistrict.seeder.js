"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const subDistrict_entity_1 = require("./../../address/entities/subDistrict.entity");
const subDistrict_json_1 = __importDefault(require("./subDistrict.json"));
class SubDistrictSeeder {
    async run(dataSource) {
        const repository = dataSource.getRepository(subDistrict_entity_1.SubDistrict);
        await repository.save(subDistrict_json_1.default, { chunk: subDistrict_json_1.default.length / 1000 });
    }
}
exports.default = SubDistrictSeeder;
//# sourceMappingURL=subDistrict.seeder.js.map