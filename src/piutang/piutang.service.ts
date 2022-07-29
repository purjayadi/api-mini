import { PiutangPayment } from './entities/piutangPayment.entity';
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
import { findPiutang, IncDecDTO, PaymentDTO } from './piutang.dto';
import { PiutangPaymentDetail } from './entities/piutangPaymentDetail.entity';

@Injectable()
export class PiutangService {
  constructor(
    @Inject('PIUTANG_REPOSITORY')
    private readonly repository: Repository<Piutang>,
    @Inject('PIUTANG_PAYMENT_REPOSITORY')
    private readonly paymentRepository: Repository<PiutangPayment>,
    @Inject('PIUTANG_PAYMENT_DETAIL_REPOSITORY')
    private readonly paymentDetail: Repository<PiutangPaymentDetail>,
  ) {}

  async findAll(payload: FilterDto): Promise<IResponse | IPaginate> {
    try {
      const {
        offset,
        limit,
        withDeleted,
        search,
        orderBy,
        order,
        dueDate,
        customer,
      } = payload;
      const piutang = await this.repository.findAndCount({
        relations: [
          'piutangPaymentDetails',
          'piutangPaymentDetails.piutangPayment',
        ],
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
                  ...(customer && { id: customer }),
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

  async findPayment(payload: FilterDto): Promise<IResponse | IPaginate> {
    try {
      const { offset, limit, withDeleted, search, orderBy, order } = payload;
      const payment = await this.paymentRepository.findAndCount({
        relations: ['piutangPaymentDetails'],
        ...(limit && { take: limit }),
        ...(offset && { skip: (offset - 1) * limit }),
        ...(withDeleted === 'true' ? { withDeleted: true } : {}),
        ...(search && {
          where: [
            {
              paymentNumber: Like(`%${search}%`),
            },
          ],
        }),
        ...(orderBy && { order: { [orderBy]: order } }),
      });
      return paginateResponse(payment, offset, limit, null, HttpStatus.OK);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async payment(payload: PaymentDTO): Promise<IResponse> {
    try {
      const tryPayment = this.paymentRepository.create(payload);
      const payment = await this.paymentRepository.save(tryPayment);
      const piutang = [];
      payload.piutangPaymentDetails.map(async (detail) => {
        piutang.push({
          piutangPaymentId: payment.id,
          piutangId: detail.piutangId,
          amount: detail.amount,
        });
      });
      await this.paymentDetail.save(piutang);
      payload.piutangPaymentDetails.map((detail) => {
        this.decrement({ id: detail.piutangId, amount: detail.amount });
      });
      return {
        message: 'Payment order successfully',
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
