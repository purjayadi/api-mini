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
import { Kas } from '../accounting/entities/kas.entity';

@Injectable()
export class PiutangService {
  constructor(
    @Inject('PIUTANG_REPOSITORY')
    private readonly repository: Repository<Piutang>,
    @Inject('PIUTANG_PAYMENT_REPOSITORY')
    private readonly paymentRepository: Repository<PiutangPayment>,
    @Inject('KAS_REPOSITORY')
    private readonly kas: Repository<Kas>,
  ) {}

  async findAll(payload: FilterDto): Promise<IResponse | IPaginate> {
    try {
      const {
        offset,
        limit,
        withDeleted,
        search,
        // order,
        dueDate,
        customer,
        categoryId,
      } = payload;

      const piutang = await this.repository.findAndCount({
        relations: ['piutangPayments', 'order'],
        ...(limit && { take: limit }),
        ...(offset && { skip: (offset - 1) * limit }),
        ...(withDeleted === 'true' ? { withDeleted: true } : {}),
        ...(search || dueDate || customer || categoryId
          ? {
              where: [
                search && {
                  order: {
                    invNumber: Like(`%${search}%`),
                    customer: {
                      name: Like(`%${search}%`),
                      customerNumber: Like(`%${search}%`),
                    },
                  },
                },
                dueDate && {
                  order: {
                    dueDate: dueDate,
                  },
                },
                customer && {
                  order: {
                    customer: {
                      id: customer,
                    },
                  },
                },
                categoryId && {
                  order: {
                    orderDetails: {
                      product: {
                        categoryId: categoryId,
                      },
                    },
                  },
                },
              ],
            }
          : {}),
        order: {
          order: {
            dueDate: 'ASC',
          },
        },
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
        relations: ['piutang', 'piutang.order.customer'],
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
      this.decrement({ id: payment.piutangId, amount: payment.amount });

      if (payment) {
        const kas = {
          date: payload.date,
          description:
            'Pembayaran dengan No. Pembayaran ' + payment.paymentNumber,
          source: 'Pembayaran:' + payment.paymentNumber,
          debit: payment.amount,
          credit: 0,
          categoryId: payload.categoryId,
        };
        await this.kas.save(kas);
      }
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

  async deletePayment(id: string) {
    try {
      const findPaymentById = await this.paymentRepository.findOne({
        where: {
          id,
        },
      });
      if (!findPaymentById) {
        return {
          message: 'Unable to find payment',
          error: null,
          status: HttpStatus.NOT_FOUND,
        };
      }
      await this.paymentRepository.delete(id);
      this.increment({
        id: findPaymentById.piutangId,
        amount: findPaymentById.amount,
      });
      const kas = await this.kas.findBy({
        source: 'Pembayaran:' + findPaymentById.paymentNumber,
      });

      if (kas) {
        await this.kas.remove(kas);
      }
      return {
        message: 'Delete payment successfuly',
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
