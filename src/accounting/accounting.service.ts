import { CreateKasDto, UpdateKasDto } from './../dto/accounting.dto';
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
import { Kas } from './entities/kas.entity';
import { FilterDto } from 'src/dto/filters.dto';

@Injectable()
export class AccountingService {
  constructor(
    @Inject('KAS_REPOSITORY')
    private readonly repository: Repository<Kas>,
  ) {}

  async findAll(payload: FilterDto): Promise<IResponse | IPaginate> {
    try {
      const {
        offset,
        limit,
        search,
        startDate,
        endDate,
        categoryId,
        withDeleted,
      } = payload;
      const data = await this.repository.findAndCount({
        ...(limit && { take: limit }),
        ...(offset && { skip: (offset - 1) * limit }),
        ...(withDeleted === 'true' ? { withDeleted: true } : {}),
        ...(search || startDate || endDate || categoryId
          ? {
              where: [
                search && {
                  description: Like(`%${search}%`),
                },
                startDate || endDate
                  ? { date: Between(startDate, endDate) }
                  : {},
                categoryId && { categoryId: categoryId },
              ],
            }
          : {}),
      });
      return paginateResponse(data, offset, limit, null, HttpStatus.OK);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(payload: CreateKasDto): Promise<IResponse> {
    try {
      await this.repository.save(payload);
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

  async update(id: string, payload: UpdateKasDto): Promise<IResponse> {
    try {
      const data = await this.repository.findOneBy({ id });
      if (!data) {
        throw new NotFoundException('Data not found');
      }
      await this.repository.update(id, payload);
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
