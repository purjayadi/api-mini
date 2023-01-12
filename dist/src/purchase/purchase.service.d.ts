import { Stock } from './../stock/entities/stock.entity';
import { ProductService } from './../product/product.service';
import { StockService } from './../stock/stock.service';
import { PurchaseOrder } from './entities/purchase.entity';
import { DataSource, Repository } from 'typeorm';
import { CreatePurchaseDto, FindPurchaseDto, UpdatePurchaseDto } from './purchase.dto';
import { IPaginate, IResponse } from '../interface/response.interface';
import { PurchaseOrderLine } from './entities/purchaseLine.entity';
export declare class PurchaseService {
    private readonly repository;
    private readonly stock;
    private readonly product;
    private readonly purchaseLine;
    private readonly stockRepository;
    private readonly connection;
    constructor(repository: Repository<PurchaseOrder>, stock: StockService, product: ProductService, purchaseLine: Repository<PurchaseOrderLine>, stockRepository: Repository<Stock>, connection: DataSource);
    create(payload: CreatePurchaseDto): Promise<IResponse>;
    findAll(payload: FindPurchaseDto): Promise<IResponse | IPaginate>;
    findOne(id: string): Promise<IResponse>;
    update(id: string, payload: UpdatePurchaseDto): Promise<IResponse>;
    remove(id: string): Promise<IResponse>;
}
