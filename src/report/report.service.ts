import { Between, LessThan, LessThanOrEqual, Repository } from 'typeorm';
import { IResponse } from 'src/interface/response.interface';
import { Inject, Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Kas } from 'src/accounting/entities/kas.entity';
import { reportDto } from './report.dto';

@Injectable()
export class ReportService {
  constructor(
    @Inject('KAS_REPOSITORY')
    private readonly repository: Repository<Kas>,
  ) {}

  async findAll(payload: reportDto): Promise<IResponse> {
    try {
      const { startDate, endDate } = payload;
      const dataKas = await this.repository.find({
        where: [
          {
            date: Between(startDate, endDate),
          },
        ],
        order: {
          date: 'ASC',
        },
      });
      const findModalAwal = await this.repository.find({
        where: [
          {
            date: LessThan(startDate),
          },
        ],
      });
      const modalAwal = findModalAwal.reduce((acc, curr) => {
        const countData = acc + (curr.debit - curr.credit);
        return countData;
      }, 0);
      let closeqty = modalAwal; // declare outside of loop
      const getSaldoAkhir = dataKas.map((data) => {
        closeqty += data.debit - data.credit;
        return {
          date: data.date,
          akun: data.category.name,
          description: data.description,
          debit: data.debit,
          credit: data.credit,
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
        status: HttpStatus.OK,
        error: null,
        data: getSaldoAkhir,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
