"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateStockDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_stock_dto_1 = require("./create-stock.dto");
class UpdateStockDto extends (0, mapped_types_1.PartialType)(create_stock_dto_1.CreateStockDto) {
}
exports.UpdateStockDto = UpdateStockDto;
//# sourceMappingURL=update-stock.dto.js.map