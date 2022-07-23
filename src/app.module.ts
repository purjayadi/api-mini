import { DatabaseModule } from 'src/database/database.module';
import { configuration } from './../config/configuration';
import { RolePermissionModule } from './user/rolePermission/rolePermission.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { ProductModule } from './product/product.module';
import { EmployeeModule } from './employee/employee.module';
import { OrderModule } from './order/order.module';
import { ScheduleModule } from './schedule/schedule.module';
import { SupplierModule } from './supplier/supplier.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { StockModule } from './stock/stock.module';
import { ReturModule } from './retur/retur.module';
import { PurchaseModule } from './purchase/purchase.module';
import { AccountingModule } from './accounting/accounting.module';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from './address/address.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './user/role/role.module';
import { PermissionModule } from './user/permission/permission.module';
import { ResourceModule } from './user/resource/resource.module';
import { ReturPurchaseModule } from './returPurchase/returPurchase.module';
import { ReturOrderModule } from './returOrder/returOrder.module';
import { PiutangModule } from './piutang/piutang.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/.env.${process.env.NODE_ENV}`,
      load: [configuration],
      isGlobal: true,
    }),
    ResourceModule,
    CustomerModule,
    ProductModule,
    EmployeeModule,
    OrderModule,
    ScheduleModule,
    SupplierModule,
    WarehouseModule,
    StockModule,
    ReturModule,
    PurchaseModule,
    AccountingModule,
    AddressModule,
    UserModule,
    AuthModule,
    RoleModule,
    PermissionModule,
    RolePermissionModule,
    ReturPurchaseModule,
    ReturOrderModule,
    PiutangModule,
    FileModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
