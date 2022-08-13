import { Category } from './entities/category.entity';
import { paginateResponse } from 'src/utils/hellper';
import { Repository } from 'typeorm';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import {
  HttpStatus,
  Inject,
  Injectable,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { FilterDto } from 'src/dto/filters.dto';
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CATEGORY_REPOSITORY')
    private readonly repository: Repository<Category>,
  ) {}

  async findAll(payload: FilterDto): Promise<IResponse | IPaginate> {
    try {
      const { offset, limit } = payload;
      const Units = await this.repository.findAndCount({
        ...(limit && { take: limit }),
        ...(offset && { skip: (offset - 1) * limit }),
      });
      return paginateResponse(Units, offset, limit, null, HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(payload: CreateCategoryDto): Promise<IResponse> {
    try {
      await this.repository.save({
        ...payload,
      });
      return {
        message: 'Create category successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<IResponse> {
    try {
      const data = await this.repository.findOneBy({ id });
      if (!data) {
        throw new NotFoundException('Unit not Found');
      }
      return { data: data, error: null, status: HttpStatus.OK };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, payload: UpdateCategoryDto): Promise<IResponse> {
    try {
      const data = await this.repository.findOneBy({ id });
      if (!data) {
        throw new NotFoundException('Data not Found');
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
      const Unit = await this.repository.findOneBy({ id });
      if (!Unit) {
        throw new NotFoundException('Data not Found');
      }
      await this.repository.delete(id);
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
