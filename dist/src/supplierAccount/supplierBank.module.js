"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierBankModule = void 0;
const supplierBank_service_1 = require("./supplierBank.service");
const database_module_1 = require("./../database/database.module");
const auth_module_1 = require("./../auth/auth.module");
const common_1 = require("@nestjs/common");
const supplierBank_controller_1 = require("./supplierBank.controller");
const supplierBank_provider_1 = require("./supplierBank.provider");
let SupplierBankModule = class SupplierBankModule {
};
SupplierBankModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, database_module_1.DatabaseModule],
        controllers: [supplierBank_controller_1.SupplierBankController],
        providers: [...supplierBank_provider_1.supplierBankProviders, supplierBank_service_1.SupplierBankService],
    })
], SupplierBankModule);
exports.SupplierBankModule = SupplierBankModule;
//# sourceMappingURL=supplierBank.module.js.map