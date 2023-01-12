import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { FilterDto } from 'src/dto/filters.dto';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';
export declare class CategoryService {
    private readonly repository;
    constructor(repository: Repository<Category>);
    findAll(payload: FilterDto): Promise<IResponse | IPaginate>;
    create(payload: CreateCategoryDto): Promise<IResponse>;
    findOne(id: string): Promise<IResponse>;
    update(id: string, payload: UpdateCategoryDto): Promise<IResponse>;
    remove(id: string): Promise<IResponse>;
}
