import { Unit } from './../../unit/entities/unit.entity';
import { Product } from './../../product/entities/product.entity';
import { Schedule } from './schedule.entity';
export declare class ScheduleDetail {
    id: string;
    scheduleId: string;
    productId: string;
    quantity: number;
    unitId: string;
    schedule: Schedule;
    product: Product;
    unit: Unit;
}
