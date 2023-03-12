import { Kas } from 'src/accounting/entities/kas.entity';
import { PiutangService } from 'src/piutang/piutang.service';
import { Stock } from './../stock/entities/stock.entity';
import { ProductService } from './../product/product.service';
import { FilterDto } from './../dto/filters.dto';
import { StockService } from './../stock/stock.service';
import { Repository, DataSource } from 'typeorm';
import { IPaginate, IResponse } from '../interface/response.interface';
import { ReturOrder } from './entities/returOrder.entity';
import { ReturOrderDetail } from './entities/returOrderDetail.entity';
import { CreateReturOrderDTO, UpdateReturOrderDTO } from './returOrder.dto';
export declare class ReturOrderService {
    private readonly repository;
    private readonly product;
    private readonly piutang;
    private readonly detail;
    private readonly connection;
    private readonly stock;
    private readonly stockRepository;
    private readonly kas;
    constructor(repository: Repository<ReturOrder>, product: ProductService, piutang: PiutangService, detail: Repository<ReturOrderDetail>, connection: DataSource, stock: StockService, stockRepository: Repository<Stock>, kas: Repository<Kas>);
    findAll(payload: FilterDto): Promise<IPaginate | IResponse>;
    create(payload: CreateReturOrderDTO): Promise<IResponse>;
    findOne(id: string): Promise<IResponse>;
    update(id: string, payload: UpdateReturOrderDTO): Promise<IResponse>;
    remove(id: string): Promise<IResponse>;
}
