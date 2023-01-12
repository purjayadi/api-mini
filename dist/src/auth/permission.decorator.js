"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckPermissions = exports.PERMISSION_CHECKER_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.PERMISSION_CHECKER_KEY = 'permission_checker_params_key';
const CheckPermissions = (...params) => (0, common_1.SetMetadata)(exports.PERMISSION_CHECKER_KEY, params);
exports.CheckPermissions = CheckPermissions;
//# sourceMappingURL=permission.decorator.js.map