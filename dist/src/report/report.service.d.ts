import { Repository } from 'typeorm';
import { IResponse } from 'src/interface/response.interface';
import { Kas } from 'src/accounting/entities/kas.entity';
import { reportDto } from './report.dto';
export declare class ReportService {
    private readonly repository;
    constructor(repository: Repository<Kas>);
    findAll(payload: reportDto): Promise<IResponse>;
}
