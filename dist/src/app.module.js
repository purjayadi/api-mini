"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const database_module_1 = require("./database/database.module");
const configuration_1 = require("./../config/configuration");
const rolePermission_module_1 = require("./user/rolePermission/rolePermission.module");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const customer_module_1 = require("./customer/customer.module");
const product_module_1 = require("./product/product.module");
const employee_module_1 = require("./employee/employee.module");
const order_module_1 = require("./order/order.module");
const schedule_module_1 = require("./schedule/schedule.module");
const supplier_module_1 = require("./supplier/supplier.module");
const warehouse_module_1 = require("./warehouse/warehouse.module");
const stock_module_1 = require("./stock/stock.module");
const retur_module_1 = require("./retur/retur.module");
const purchase_module_1 = require("./purchase/purchase.module");
const accounting_module_1 = require("./accounting/accounting.module");
const config_1 = require("@nestjs/config");
const address_module_1 = require("./address/address.module");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const role_module_1 = require("./user/role/role.module");
const permission_module_1 = require("./user/permission/permission.module");
const resource_module_1 = require("./user/resource/resource.module");
const returPurchase_module_1 = require("./returPurchase/returPurchase.module");
const returOrder_module_1 = require("./returOrder/returOrder.module");
const piutang_module_1 = require("./piutang/piutang.module");
const file_module_1 = require("./file/file.module");
const cashFlow_module_1 = require("./accounting/cashFlow.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const category_module_1 = require("./category/category.module");
const report_module_1 = require("./report/report.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
                load: [configuration_1.configuration],
                isGlobal: true,
            }),
            resource_module_1.ResourceModule,
            customer_module_1.CustomerModule,
            product_module_1.ProductModule,
            employee_module_1.EmployeeModule,
            order_module_1.OrderModule,
            schedule_module_1.ScheduleModule,
            supplier_module_1.SupplierModule,
            warehouse_module_1.WarehouseModule,
            stock_module_1.StockModule,
            retur_module_1.ReturModule,
            purchase_module_1.PurchaseModule,
            accounting_module_1.AccountingModule,
            address_module_1.AddressModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            role_module_1.RoleModule,
            permission_module_1.PermissionModule,
            rolePermission_module_1.RolePermissionModule,
            returPurchase_module_1.ReturPurchaseModule,
            returOrder_module_1.ReturOrderModule,
            piutang_module_1.PiutangModule,
            file_module_1.FileModule,
            database_module_1.DatabaseModule,
            cashFlow_module_1.CashFlowModule,
            dashboard_module_1.DashboardModule,
            category_module_1.CategoryModule,
            report_module_1.ReportModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map