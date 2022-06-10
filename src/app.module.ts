import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
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
import { AddressModule } from './address/address.module';

@Module({
  imports: [AuthModule, CustomerModule, ProductModule, EmployeeModule, OrderModule, ScheduleModule, SupplierModule, WarehouseModule, StockModule, ReturModule, PurchaseModule, AccountingModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '172.25.0.2',
      port: 3306,
      database: 'db_mini',
      username: 'root',
      password: 'password',
      entities: [
        __dirname + '/**/*.entity{.ts,.js}',
      ],
      logging: true,
      synchronize: true, // never true in production!
    }),
    AddressModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
