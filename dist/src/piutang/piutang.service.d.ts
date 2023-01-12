import { PiutangPayment } from './entities/piutangPayment.entity';
import { FilterDto } from './../dto/filters.dto';
import { Repository } from 'typeorm';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { Piutang } from './entities/piutang.entity';
import { findPiutang, IncDecDTO, PaymentDTO } from './piutang.dto';
import { PiutangPaymentDetail } from './entities/piutangPaymentDetail.entity';
export declare class PiutangService {
    private readonly repository;
    private readonly paymentRepository;
    private readonly paymentDetail;
    constructor(repository: Repository<Piutang>, paymentRepository: Repository<PiutangPayment>, paymentDetail: Repository<PiutangPaymentDetail>);
    findAll(payload: FilterDto): Promise<IResponse | IPaginate>;
    findPiutangByCustomer(payload: findPiutang): Promise<IResponse>;
    findPayment(payload: FilterDto): Promise<IResponse | IPaginate>;
    payment(payload: PaymentDTO): Promise<IResponse>;
    increment(payload: IncDecDTO): Promise<boolean>;
    decrement(payload: IncDecDTO): Promise<boolean>;
}
