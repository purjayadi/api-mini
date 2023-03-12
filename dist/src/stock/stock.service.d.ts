import { IResponse } from 'src/utils/interfaces/response.interface';
import { Repository } from 'typeorm';
import { Stock } from './entities/stock.entity';
export declare class StockService {
    private readonly repository;
    constructor(repository: Repository<Stock>);
    findAll(payload: any): Promise<IResponse>;
    increment(productId: string, quantity: number): Promise<boolean>;
    decrement(productId: string, quantity: number): Promise<void>;
    findOne(id: string): Promise<Stock>;
}
