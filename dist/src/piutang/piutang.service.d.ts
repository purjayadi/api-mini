import { PiutangPayment } from './entities/piutangPayment.entity';
import { FilterDto } from './../dto/filters.dto';
import { Repository } from 'typeorm';
import { HttpStatus } from '@nestjs/common';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { Piutang } from './entities/piutang.entity';
import { findPiutang, IncDecDTO, PaymentDTO } from './piutang.dto';
import { Kas } from '../accounting/entities/kas.entity';
export declare class PiutangService {
    private readonly repository;
    private readonly paymentRepository;
    private readonly kas;
    constructor(repository: Repository<Piutang>, paymentRepository: Repository<PiutangPayment>, kas: Repository<Kas>);
    findAll(payload: FilterDto): Promise<IResponse | IPaginate>;
    findPiutangByOrder(orderId: string): Promise<IResponse>;
    findPiutangByCustomer(payload: findPiutang): Promise<IResponse>;
    findPayment(payload: FilterDto): Promise<IResponse | IPaginate>;
    payment(payload: PaymentDTO): Promise<IResponse>;
    deletePayment(id: string): Promise<{
        message: string;
        error: any;
        status: HttpStatus;
    }>;
    increment(payload: IncDecDTO): Promise<boolean>;
    decrement(payload: IncDecDTO): Promise<boolean>;
    decrementPiutang(payload: IncDecDTO): Promise<boolean>;
    incrementPiutang(payload: IncDecDTO): Promise<boolean>;
}
