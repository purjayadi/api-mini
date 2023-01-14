import { PurchaseService } from './purchase.service';
import { UpdatePurchaseDto, CreatePurchaseDto, FindPurchaseDto } from './purchase.dto';
export declare class PurchaseController {
    private readonly purchaseService;
    constructor(purchaseService: PurchaseService);
    create(createPurchaseDto: CreatePurchaseDto): Promise<import("../interface/response.interface").IResponse>;
    findAll(payload: FindPurchaseDto): Promise<import("../interface/response.interface").IResponse | import("../interface/response.interface").IPaginate>;
    findOne(id: string): Promise<import("../interface/response.interface").IResponse>;
    update(id: string, payload: UpdatePurchaseDto): Promise<import("../interface/response.interface").IResponse>;
    remove(id: string): Promise<import("../interface/response.interface").IResponse>;
}
