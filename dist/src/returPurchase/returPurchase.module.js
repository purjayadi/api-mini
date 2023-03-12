"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturPurchaseModule = void 0;
const stock_module_1 = require("./../stock/stock.module");
const product_module_1 = require("../product/product.module");
const auth_module_1 = require("./../auth/auth.module");
const database_module_1 = require("../database/database.module");
const common_1 = require("@nestjs/common");
const returPurchase_provider_1 = require("./returPurchase.provider");
const returPurchase_service_1 = require("./returPurchase.service");
const returPurchase_controller_1 = require("./returPurchase.controller");
let ReturPurchaseModule = class ReturPurchaseModule {
};
ReturPurchaseModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, auth_module_1.AuthModule, stock_module_1.StockModule, product_module_1.ProductModule],
        controllers: [returPurchase_controller_1.ReturPurchaseController],
        providers: [
            ...returPurchase_provider_1.returPurchaseProviders,
            ...returPurchase_provider_1.returPurchaseDetailProviders,
            returPurchase_service_1.ReturPurchaseService,
        ],
    })
], ReturPurchaseModule);
exports.ReturPurchaseModule = ReturPurchaseModule;
//# sourceMappingURL=returPurchase.module.js.map