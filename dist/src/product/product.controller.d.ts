import { IPaginate, IResponse } from '../interface/response.interface';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductDto } from './dto/find-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    create(payload: CreateProductDto): Promise<IResponse>;
    findAll(payload: FindProductDto): Promise<IPaginate | IResponse>;
    findOne(id: string): Promise<IResponse>;
    update(id: string, payload: UpdateProductDto): Promise<IResponse>;
    remove(id: string): Promise<IResponse>;
}
