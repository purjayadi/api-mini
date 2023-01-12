import { StockService } from './../stock/stock.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { Product } from './entities/product.entity';
import { Price } from './entities/price.entity';
import { IPaginate, IResponse } from '../interface/response.interface';
export declare class ProductService {
    private readonly repository;
    private readonly price;
    private readonly stock;
    constructor(repository: Repository<Product>, price: Repository<Price>, stock: StockService);
    findAll(payload: FindProductDto): Promise<IPaginate | IResponse>;
    create(payload: CreateProductDto): Promise<IResponse>;
    findOne(id: string): Promise<IResponse>;
    update(id: string, payload: UpdateProductDto): Promise<IResponse>;
    remove(id: string): Promise<IResponse>;
    findValueProductByUnit(productId: string, unitId: string): Promise<Price>;
}
