import { IResponse, IPaginate } from 'src/interface/response.interface';
import { FilterDto } from 'src/dto/filters.dto';
import { DashboardService } from './dashboard.service';
import { DashboardTransactionDTO } from 'src/dto/dashboard.dto';
export declare class DashboardController {
    private readonly service;
    constructor(service: DashboardService);
    findAll(payload: FilterDto): Promise<IResponse | IPaginate>;
    getWidget(): Promise<IResponse | IPaginate>;
    getTransaction(payload: DashboardTransactionDTO): Promise<{
        data: any[];
        error: any;
        status: import("@nestjs/common").HttpStatus;
    }>;
}
