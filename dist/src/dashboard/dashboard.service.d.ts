import { DashboardTransactionDTO } from './../dto/dashboard.dto';
import { Order } from './../order/entities/order.entity';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { HttpStatus } from '@nestjs/common';
import { Schedule } from 'src/schedule/entities/schedule.entity';
import { FilterDto } from 'src/dto/filters.dto';
import { Repository } from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
export declare class DashboardService {
    private readonly schedule;
    private readonly customer;
    private readonly order;
    constructor(schedule: Repository<Schedule>, customer: Repository<Customer>, order: Repository<Order>);
    getSchedule(payload: FilterDto): Promise<IResponse | IPaginate>;
    getWidget(): Promise<IResponse | IPaginate>;
    getTransaction(payload: DashboardTransactionDTO): Promise<{
        data: any[];
        error: any;
        status: HttpStatus;
    }>;
}
