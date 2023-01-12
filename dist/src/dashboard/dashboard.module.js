"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardModule = void 0;
const order_provider_1 = require("./../order/order.provider");
const schedule_provider_1 = require("./../schedule/schedule.provider");
const common_1 = require("@nestjs/common");
const database_module_1 = require("../database/database.module");
const auth_module_1 = require("../auth/auth.module");
const dashboard_controller_1 = require("./dashboard.controller");
const dashboard_service_1 = require("./dashboard.service");
const customer_provider_1 = require("../customer/customer.provider");
const order_provider_2 = require("../order/order.provider");
let DashboardModule = class DashboardModule {
};
DashboardModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule, auth_module_1.AuthModule],
        controllers: [dashboard_controller_1.DashboardController],
        providers: [
            ...schedule_provider_1.scheduleProviders,
            ...customer_provider_1.customerProviders,
            ...order_provider_2.orderProviders,
            ...order_provider_1.orderDetailProviders,
            dashboard_service_1.DashboardService,
        ],
    })
], DashboardModule);
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map