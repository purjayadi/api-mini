import { Stock } from './../stock/entities/stock.entity';
import { ProductService } from './../product/product.service';
import { CreateReturPurchaseDto, UpdateReturPurchaseDTO } from './returPurchase.dto';
import { FilterDto } from './../dto/filters.dto';
import { ReturPurchase } from './entities/returPurchase.entity';
import { StockService } from './../stock/stock.service';
import { Repository, DataSource } from 'typeorm';
import { IPaginate, IResponse } from '../interface/response.interface';
import { ReturPurchaseDetail } from './entities/returPurchaseDetail.entity';
export declare class ReturPurchaseService {
    private readonly repository;
    private readonly product;
    private readonly detail;
    private readonly connection;
    private readonly stock;
    private readonly stockRepository;
    constructor(repository: Repository<ReturPurchase>, product: ProductService, detail: Repository<ReturPurchaseDetail>, connection: DataSource, stock: StockService, stockRepository: Repository<Stock>);
    findAll(payload: FilterDto): Promise<IPaginate | IResponse>;
    create(payload: CreateReturPurchaseDto): Promise<IResponse>;
    findOne(id: string): Promise<IResponse>;
    update(id: string, payload: UpdateReturPurchaseDTO): Promise<IResponse>;
    remove(id: string): Promise<IResponse>;
}
