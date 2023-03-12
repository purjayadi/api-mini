import { FilterDto } from './../dto/filters.dto';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';
export declare class CategoryController {
    private readonly service;
    constructor(service: CategoryService);
    findAll(payload: FilterDto): Promise<IResponse | IPaginate>;
    create(payload: CreateCategoryDto): Promise<IResponse>;
    findOne(id: string): Promise<IResponse>;
    update(id: string, payload: UpdateCategoryDto): Promise<IResponse>;
    remove(id: string): Promise<IResponse>;
}
