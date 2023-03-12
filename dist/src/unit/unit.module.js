"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitModule = void 0;
const database_module_1 = require("./../database/database.module");
const auth_module_1 = require("./../auth/auth.module");
const common_1 = require("@nestjs/common");
const unit_controller_1 = require("../unit/unit.controller");
const unit_service_1 = require("../unit/unit.service");
const unit_provider_1 = require("./unit.provider");
let UnitModule = class UnitModule {
};
UnitModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, database_module_1.DatabaseModule],
        controllers: [unit_controller_1.UnitController],
        providers: [...unit_provider_1.unitProviders, unit_service_1.UnitService],
    })
], UnitModule);
exports.UnitModule = UnitModule;
//# sourceMappingURL=unit.module.js.map