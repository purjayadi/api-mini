import { FilterDto } from './../dto/filters.dto';
import { Repository, Like } from 'typeorm';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { paginateResponse } from 'src/utils/hellper';
import { Piutang } from './entities/piutang.entity';
import { findPiutang, IncDecDTO } from './piutang.dto';

@Injectable()
export class PiutangService {
  constructor(
    @Inject('PIUTANG_REPOSITORY')
    private readonly repository: Repository<Piutang>,
  ) {}

  async findAll(payload: FilterDto): Promise<IResponse | IPaginate> {
    try {
      const { offset, limit, withDeleted, search, orderBy, order, dueDate } =
        payload;
      const piutang = await this.repository.findAndCount({
        ...(limit && { take: limit }),
        ...(offset && { skip: (offset - 1) * limit }),
        ...(withDeleted === 'true' ? { withDeleted: true } : {}),
        ...(search && {
          where: [
            {
              order: {
                invNumber: Like(`%${search}%`),
                customer: {
                  name: Like(`%${search}%`),
                },
                dueDate: dueDate,
              },
            },
          ],
        }),
        ...(orderBy && { order: { [orderBy]: order } }),
      });
      return paginateResponse(piutang, offset, limit, null, HttpStatus.OK);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findPiutangByCustomer(payload: findPiutang): Promise<IResponse> {
    try {
      const { customer, dueDate } = payload;
      const piutang = await this.repository.find({
        where: {
          order: {
            customer: {
              id: customer,
            },
            ...(dueDate && { dueDate: dueDate }),
          },
        },
      });
      if (piutang.length <= 0) {
        throw new NotFoundException('Piutang Order Not Found');
      }
      return { data: piutang, error: null, status: HttpStatus.OK };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async increment(payload: IncDecDTO): Promise<boolean> {
    try {
      const { id, amount } = payload;
      const piutang = await this.repository.findOneBy({ id: id });
      if (!piutang) {
        return false;
      }
      await this.repository.increment({ id: id }, 'remaining', amount);
      Logger.log(`Increment piutang successfully ${amount}`);
      return true;
    } catch (error) {
      return false;
    }
  }

  async decrement(payload: IncDecDTO): Promise<boolean> {
    try {
      const { id, amount } = payload;
      const piutang = await this.repository.findOneBy({ id: id });
      if (!piutang) {
        return false;
      }
      await this.repository.decrement({ id: id }, 'remaining', amount);
      Logger.log(`Decrement piutang successfully ${amount}`);
      return true;
    } catch (error) {
      return false;
    }
  }
}
