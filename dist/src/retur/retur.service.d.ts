import { CreateReturDto } from './dto/create-retur.dto';
import { UpdateReturDto } from './dto/update-retur.dto';
export declare class ReturService {
    create(createReturDto: CreateReturDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateReturDto: UpdateReturDto): string;
    remove(id: number): string;
}
