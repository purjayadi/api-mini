"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAccountingDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_accounting_dto_1 = require("./create-accounting.dto");
class UpdateAccountingDto extends (0, mapped_types_1.PartialType)(create_accounting_dto_1.CreateAccountingDto) {
}
exports.UpdateAccountingDto = UpdateAccountingDto;
//# sourceMappingURL=update-accounting.dto.js.map