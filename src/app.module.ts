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
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from './address/address.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './user/role/role.module';
import { PermissionModule } from './user/permission/permission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
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
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      logging: true,
      synchronize: true, // never true in production!
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
