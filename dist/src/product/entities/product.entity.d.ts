import { ReturOrderDetail } from './../../returOrder/entities/returOrderDetail.entity';
import { Stock } from './../../stock/entities/stock.entity';
import { OrderDetail } from './../../order/entities/orderDetail.entity';
import { ScheduleDetail } from './../../schedule/entities/scheduleDetail.entity';
import { PurchaseOrderLine } from './../../purchase/entities/purchaseLine.entity';
import { Warehouse } from './../../warehouse/entities/warehouse.entity';
import { Supplier } from './../../supplier/entities/supplier.entity';
import { BaseColumn } from 'src/utils/base.entity';
import { Price } from './price.entity';
import { ReturPurchaseDetail } from 'src/returPurchase/entities/returPurchaseDetail.entity';
import { Category } from 'src/category/entities/category.entity';
export declare class Product extends BaseColumn {
    id: string;
    code: string;
    name: string;
    purchasePrice: number;
    supplierId: string;
    categoryId: string;
    supplier: Supplier;
    prices: Price[];
    warehouses: Warehouse[];
    purchaseLines: PurchaseOrderLine[];
    scheduleDetails: ScheduleDetail[];
    orderDetails: OrderDetail[];
    stock: Stock;
    returPurchaseDetails: ReturPurchaseDetail[];
    returOrderDetails: ReturOrderDetail[];
    category: Category;
}
