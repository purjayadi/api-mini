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
import { CreateUnitDto, FindUnitDto } from '../product/dto/unit.dto';
import { Unit } from './entities/unit.entity';

@Injectable()
export class UnitService {
  constructor(
    @Inject('UNIT_REPOSITORY')
    private readonly repository: Repository<Unit>,
  ) {}

  async findAll(payload: FindUnitDto): Promise<IResponse | IPaginate> {
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

  async create(payload: CreateUnitDto): Promise<IResponse> {
    try {
      await this.repository.save({
        ...payload,
      });
      return {
        message: 'Create Unit successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<IResponse> {
    try {
      const Unit = await this.repository.findOneBy({ id });
      if (!Unit) {
        throw new NotFoundException('Unit not Found');
      }
      return { data: Unit, error: null, status: HttpStatus.OK };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    payload: Partial<CreateUnitDto>,
  ): Promise<IResponse> {
    try {
      const Unit = await this.repository.findOneBy({ id });
      if (!Unit) {
        throw new NotFoundException('Unit not Found');
      }
      await this.repository.update(id, payload);
      return {
        message: 'Update Unit successfully',
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
        throw new NotFoundException('Unit not Found');
      }
      await this.repository.delete(id);
      return {
        message: 'Delete Unit successfully',
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
