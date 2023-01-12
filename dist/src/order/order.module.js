"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModule = void 0;
const piutang_module_1 = require("./../piutang/piutang.module");
const product_module_1 = require("../product/product.module");
const stock_module_1 = require("./../stock/stock.module");
const database_module_1 = require("../database/database.module");
const auth_module_1 = require("./../auth/auth.module");
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const order_controller_1 = require("./order.controller");
const order_provider_1 = require("./order.provider");
const piutang_provider_1 = require("../piutang/piutang.provider");
const accounting_provider_1 = require("../accounting/accounting.provider");
let OrderModule = class OrderModule {
};
OrderModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            database_module_1.DatabaseModule,
            stock_module_1.StockModule,
            product_module_1.ProductModule,
            piutang_module_1.PiutangModule,
        ],
        controllers: [order_controller_1.OrderController],
        providers: [
            ...order_provider_1.orderProviders,
            ...order_provider_1.orderDetailProviders,
            ...piutang_provider_1.piutangProviders,
            ...accounting_provider_1.kasProviders,
            order_service_1.OrderService,
        ],
    })
], OrderModule);
exports.OrderModule = OrderModule;
//# sourceMappingURL=order.module.js.map