"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashFlowModule = void 0;
const common_1 = require("@nestjs/common");
const accounting_provider_1 = require("./accounting.provider");
const database_module_1 = require("../database/database.module");
const auth_module_1 = require("../auth/auth.module");
const cashFlow_service_1 = require("./cashFlow.service");
const cashFlow_controller_1 = require("./cashFlow.controller");
let CashFlowModule = class CashFlowModule {
};
CashFlowModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, auth_module_1.AuthModule],
        controllers: [cashFlow_controller_1.CashFlowController],
        providers: [...accounting_provider_1.kasProviders, ...accounting_provider_1.cashFlowProviders, cashFlow_service_1.CashFlowService],
    })
], CashFlowModule);
exports.CashFlowModule = CashFlowModule;
//# sourceMappingURL=cashFlow.module.js.map