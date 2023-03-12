"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportService = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
let ReportService = class ReportService {
    constructor(repository) {
        this.repository = repository;
    }
    async findAll(payload) {
        try {
            const { startDate, endDate } = payload;
            const dataKas = await this.repository.find({
                where: [
                    {
                        date: (0, typeorm_1.Between)(startDate, endDate),
                    },
                ],
                order: {
                    date: 'ASC',
                },
            });
            const findModalAwal = await this.repository.find({
                where: [
                    {
                        date: (0, typeorm_1.LessThan)(startDate),
                    },
                ],
            });
            const modalAwal = findModalAwal.reduce((acc, curr) => {
                const countData = acc + (curr.debit - curr.credit);
                return countData;
            }, 0);
            let closeqty = modalAwal;
            const getSaldoAkhir = dataKas.map((data) => {
                closeqty += data.debit - data.credit;
                return {
                    date: data.date,
                    akun: data.category.name,
                    description: data.description,
                    debit: Number(data.debit),
                    credit: Number(data.credit),
                    saldoAkhir: closeqty,
                };
            });
            getSaldoAkhir.unshift({
                date: startDate,
                akun: 'Modal Awal',
                description: 'Saldo Awal Kas',
                debit: modalAwal,
                credit: 0,
                saldoAkhir: modalAwal,
            });
            return {
                status: common_1.HttpStatus.OK,
                error: null,
                data: getSaldoAkhir,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status ? common_1.HttpStatus.NOT_FOUND : common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
ReportService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('KAS_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ReportService);
exports.ReportService = ReportService;
//# sourceMappingURL=report.service.js.map