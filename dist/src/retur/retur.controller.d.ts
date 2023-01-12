import { ReturService } from './retur.service';
import { CreateReturDto } from './dto/create-retur.dto';
import { UpdateReturDto } from './dto/update-retur.dto';
export declare class ReturController {
    private readonly returService;
    constructor(returService: ReturService);
    create(createReturDto: CreateReturDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateReturDto: UpdateReturDto): string;
    remove(id: string): string;
}
