import { IResponse } from 'src/interface/response.interface';
import { ReportService } from './report.service';
import { reportDto } from './report.dto';
export declare class ReportController {
    private readonly service;
    constructor(service: ReportService);
    findAll(payload: reportDto): Promise<IResponse>;
}
