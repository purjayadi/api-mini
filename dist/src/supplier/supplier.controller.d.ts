import { IResponse, IPaginate } from '../interface/response.interface';
import { SupplierService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { FindSupplierDto } from './dto/find-supplier.dto';
export declare class SupplierController {
    private readonly supplierService;
    constructor(supplierService: SupplierService);
    create(createSupplierDto: CreateSupplierDto): Promise<IResponse>;
    findAll(payload: FindSupplierDto): Promise<IResponse | IPaginate>;
    findOne(id: string): Promise<IResponse>;
    update(id: string, updateSupplierDto: UpdateSupplierDto): Promise<IResponse>;
    remove(id: string): Promise<IResponse>;
}
