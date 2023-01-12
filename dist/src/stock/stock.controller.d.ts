import { FilterDto } from './../dto/filters.dto';
import { StockService } from './stock.service';
export declare class StockController {
    private readonly stockService;
    constructor(stockService: StockService);
    findAll(payload: FilterDto): Promise<import("../utils/interfaces/response.interface").IResponse>;
}
