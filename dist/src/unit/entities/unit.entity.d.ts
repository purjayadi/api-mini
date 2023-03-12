import { ReturOrderDetail } from './../../returOrder/entities/returOrderDetail.entity';
import { ReturPurchaseDetail } from './../../returPurchase/entities/returPurchaseDetail.entity';
import { OrderDetail } from './../../order/entities/orderDetail.entity';
import { ScheduleDetail } from './../../schedule/entities/scheduleDetail.entity';
import { PurchaseOrderLine } from './../../purchase/entities/purchaseLine.entity';
import { Price } from '../../product/entities/price.entity';
import { BaseColumn } from 'src/utils/base.entity';
export declare class Unit extends BaseColumn {
    id: string;
    name: string;
    prices: Price[];
    purchaseLines: PurchaseOrderLine[];
    scheduleDetails: ScheduleDetail[];
    orderDetails: OrderDetail[];
    returPurchaseDetails: ReturPurchaseDetail[];
    returOrderDetails: ReturOrderDetail[];
}
