import { CreateCashFlowDto, UpdateCashFlowDto } from './../dto/accounting.dto';
import { paginateResponse } from 'src/utils/hellper';
import { Between, Like, Repository } from 'typeorm';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import {
  Inject,
  Injectable,
  HttpStatus,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { CashFlow } from './entities/cashFlow.entity';
import { FilterDto } from 'src/dto/filters.dto';
import { Kas } from './entities/kas.entity';

@Injectable()
export class CashFlowService {
  constructor(
    @Inject('CASH_FLOW_REPOSITORY')
    private readonly repository: Repository<CashFlow>,
    @Inject('KAS_REPOSITORY')
    private readonly kas: Repository<Kas>,
  ) {}

  async findAll(payload: FilterDto): Promise<IResponse | IPaginate> {
    try {
      const { offset, limit, search, startDate, endDate, categoryId } = payload;
      const data = await this.repository.findAndCount({
        ...(limit && { take: limit }),
        ...(offset && { skip: (offset - 1) * limit }),
        ...(search || startDate || endDate || categoryId
          ? {
              where: {
                ...(search && {
                  employee: {
                    name: Like(`%${search}%`),
                  },
                  cashFlowNumber: Like(`%${search}%`),
                }),
                ...(startDate || endDate
                  ? { date: Between(startDate, endDate) }
                  : {}),
                ...(categoryId && { categoryId: categoryId }),
              },
            }
          : {}),
        order: {
          code: 'DESC',
        },
      });
      return paginateResponse(data, offset, limit, null, HttpStatus.OK);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(payload: CreateCashFlowDto): Promise<IResponse> {
    try {
      const data = await this.repository.find({
        order: { code: 'DESC' },
        take: 1,
        skip: 0,
        withDeleted: true,
      });
      const trySave = this.repository.create({
        ...payload,
        code: data[0]?.code ? data[0].code : 0,
      });
      const cashFlow = await this.repository.save(trySave);
      if (cashFlow) {
        if (
          payload.categoryId !== payload.toCategoryId &&
          payload.toCategoryId !== ''
        ) {
          const kas = {
            date: payload.date,
            description: payload.description,
            source: 'Kas:' + cashFlow.cashFlowNumber,
            debit: 0,
            credit: payload.type === 'Credit' ? cashFlow.amount : 0,
            categoryId: payload.categoryId,
          };
          const otherKas = {
            date: payload.date,
            description: payload.description,
            source: 'Kas:' + cashFlow.cashFlowNumber,
            debit: 0,
            credit: payload.type === 'Credit' ? cashFlow.amount : 0,
            categoryId: payload.categoryId,
          };
          await this.kas.save(kas);
        } else {
          const kas = {
            date: payload.date,
            description: payload.description,
            source: 'Kas:' + cashFlow.cashFlowNumber,
            debit: payload.type === 'Debit' ? cashFlow.amount : 0,
            credit: payload.type === 'Credit' ? cashFlow.amount : 0,
            categoryId: payload.categoryId,
          };
          await this.kas.save(kas);
        }
      }
      return {
        message: 'Create data successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<IResponse> {
    try {
      const data = await this.repository.findOneBy({ id });
      if (!data) {
        throw new NotFoundException('Data not found');
      }
      return { data: data, error: null, status: HttpStatus.OK };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findCashFlowByCode(code: string): Promise<IResponse> {
    try {
      const data = await this.repository.findOneBy({
        cashFlowNumber: code,
      });
      if (!data) {
        throw new NotFoundException('Data not found');
      }
      return { data: data, error: null, status: HttpStatus.OK };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, payload: UpdateCashFlowDto): Promise<IResponse> {
    try {
      const data = await this.repository.findOneBy({ id });
      if (!data) {
        throw new NotFoundException('Data not found');
      }
      await this.repository.update(id, payload);
      const findKas = await this.kas.findOneBy({
        source: 'Kas:' + data.cashFlowNumber,
      });
      const kas = {
        date: payload.date,
        description: payload.description,
        source: 'Kas:' + data.cashFlowNumber,
        debit: payload.type === 'Debit' ? payload.amount : 0,
        credit: payload.type === 'Credit' ? payload.amount : 0,
      };
      await this.kas.update(findKas.id, kas);
      return {
        message: 'Update data successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<IResponse> {
    try {
      const data = await this.repository.findOneBy({ id });
      if (!data) {
        throw new NotFoundException('Data not found');
      }
      await this.repository.delete({ id });
      const findKas = await this.kas.findOneBy({
        source: 'Kas:' + data.cashFlowNumber,
      });
      await this.kas.softDelete({ id: findKas.id });
      return {
        message: 'Delete data successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
