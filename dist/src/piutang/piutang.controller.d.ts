import { FilterDto } from './../dto/filters.dto';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { PiutangService } from './piutang.service';
import { findPiutang, PaymentDTO } from './piutang.dto';
export declare class PiutangController {
    private readonly service;
    constructor(service: PiutangService);
    findAll(payload: FilterDto): Promise<IResponse | IPaginate>;
    findPiutangByCustomer(payload: findPiutang): Promise<IResponse>;
    findPayment(payload: FilterDto): Promise<IResponse | IPaginate>;
    payment(payload: PaymentDTO): Promise<IResponse>;
    remove(id: string): Promise<{
        message: string;
        error: any;
        status: import("@nestjs/common").HttpStatus;
    }>;
}
