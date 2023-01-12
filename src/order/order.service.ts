import { FilterDto } from './../dto/filters.dto';
import { PiutangPayment } from './../piutang/entities/piutangPayment.entity';
import { Stock } from './../stock/entities/stock.entity';
import { OrderDetail } from './entities/orderDetail.entity';
import { ProductService } from './../product/product.service';
import { StockService } from './../stock/stock.service';
import { Repository, Like, DataSource } from 'typeorm';
import { Order } from './entities/order.entity';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from './order.dto';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { paginateResponse } from 'src/utils/hellper';
import { Piutang } from 'src/piutang/entities/piutang.entity';
import { PiutangPaymentDetail } from 'src/piutang/entities/piutangPaymentDetail.entity';
import { PiutangService } from 'src/piutang/piutang.service';
import { Kas } from 'src/accounting/entities/kas.entity';

@Injectable()
export class OrderService {
  constructor(
    private readonly piutangService: PiutangService,
    @Inject('ORDER_REPOSITORY')
    private readonly repository: Repository<Order>,
    @Inject('ORDER_DETAIL_REPOSITORY')
    private readonly orderDetail: Repository<OrderDetail>,
    private readonly stock: StockService,
    private readonly product: ProductService,
    @Inject('STOCK_REPOSITORY')
    private readonly stockRepository: Repository<Stock>,
    @Inject('PIUTANG_REPOSITORY')
    private readonly piutang: Repository<Piutang>,
    @Inject('PIUTANG_PAYMENT_REPOSITORY')
    private readonly piutangPayment: Repository<PiutangPayment>,
    @Inject('PIUTANG_PAYMENT_DETAIL_REPOSITORY')
    private readonly piutangPaymentDetail: Repository<PiutangPaymentDetail>,
    @Inject('KAS_REPOSITORY')
    private readonly kas: Repository<Kas>,
    @Inject('DATA_SOURCE') private readonly connection: DataSource,
  ) {}

  async findAll(payload: FilterDto): Promise<IResponse | IPaginate> {
    try {
      const { offset, limit, search, orderBy, order } = payload;
      const orders = await this.repository.findAndCount({
        ...(limit && { take: limit }),
        ...(offset && { skip: (offset - 1) * limit }),
        ...(search && {
          where: [
            {
              invNumber: Like(`%${search}%`),
            },
            {
              customer: {
                name: Like(`%${search}%`),
              },
            },
          ],
        }),
        order: {
          code: 'DESC',
          ...(orderBy && { [orderBy]: order ? order : 'ASC' }),
        },

        // ...(orderBy && { order: { [orderBy]: order } }),
      });
      return paginateResponse(orders, offset, limit, null, HttpStatus.OK);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(payload: CreateOrderDto): Promise<IResponse> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const data = await this.repository.find({
        order: { code: 'DESC' },
        take: 1,
        skip: 0,
        withDeleted: true,
      });
      const tryOrder = this.repository.create({
        ...payload,
        code: data[0]?.code ? data[0].code : 0,
      });
      const order = await this.repository.save(tryOrder);
      if (order) {
        order.orderDetails.map(async (detail) => {
          const productValue = await this.product.findValueProductByUnit(
            detail.productId,
            detail.unitId,
          );
          const quantity = productValue.value * detail.quantity;
          this.stock.decrement(detail.productId, quantity);
        });
      }
      if (payload.paymentMethod === 'Due Date') {
        const piutang = await this.piutang.save({
          orderId: order.id,
          total: order.total,
          remaining: order.total,
        });
        Logger.debug(piutang);
        if (payload.payment) {
          const tryPayment = this.piutangPayment.create({
            date: payload.date,
            paymentMethod: 'Cash',
          });
          const payment = await this.piutangPayment.save(tryPayment);
          if (payment) {
            const tryPaymentDetail = this.piutangPaymentDetail.create({
              piutangId: piutang.id,
              amount: payload.payment,
              piutangPaymentId: payment.id,
            });
            const paymentDetail = await this.piutangPaymentDetail.save(
              tryPaymentDetail,
            );
            if (paymentDetail) {
              this.piutangService.decrement({
                id: piutang.id,
                amount: payload.payment as unknown as string,
              });
            }
          }
        }
      } else {
        if (payload.status === 'Completed') {
          const payloadKas = {
            date: payload.date,
            description: 'Penjualan dengan No. Invoice ' + order.invNumber,
            debit: order.total,
            source: 'Penjualan:' + order.invNumber,
            credit: 0,
          };
          this.kas.save(payloadKas);
        }
      }
      await queryRunner.commitTransaction();
      return {
        message: 'Create order successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async findOne(id: string): Promise<IResponse> {
    try {
      const order = await this.repository.findOneBy({ id });
      if (!order) {
        throw new NotFoundException('Order Not Found');
      }
      return { data: order, error: null, status: HttpStatus.OK };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, payload: UpdateOrderDto): Promise<IResponse> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const order = await this.repository.findOneBy({ id });
      if (!order) {
        throw new NotFoundException('Order Not Found');
      }
      order.orderDetails.map(async (detail) => {
        const productValue = await this.product.findValueProductByUnit(
          detail.productId,
          detail.unitId,
        );
        const stock = await this.stock.findOne(detail.productId);
        if (stock) {
          const quantity = productValue.value * detail.quantity;
          stock.quantity += quantity;
          await this.stockRepository.save(stock);
          Logger.log(`Increase stock success ${quantity}`);
        }
      });
      const newOrder = {
        date: payload.date,
        customerId: payload.customerId,
        employeeId: payload.employeeId,
        total: payload.total,
        paymentMethod: payload.paymentMethod,
        status: payload.status,
      };
      const newOrderDetail = [];
      payload.orderDetails?.map(async (detail) => {
        newOrderDetail.push({
          orderId: id,
          productId: detail.productId,
          price: detail.price,
          quantity: detail.quantity,
          unitId: detail.unitId,
          subTotal: detail.subTotal,
        });
      });
      await this.orderDetail.delete({ orderId: id });
      await this.orderDetail.save(newOrderDetail);
      await this.repository.update(id, newOrder);
      payload.orderDetails.map(async (detail) => {
        const productValue = await this.product.findValueProductByUnit(
          detail.productId,
          detail.unitId,
        );
        const stock = await this.stock.findOne(detail.productId);
        if (stock) {
          const quantity = productValue.value * detail.quantity;
          stock.quantity -= quantity;
          await this.stockRepository.save(stock);
          Logger.log(`Decrease stock success ${quantity}`);
        }
      });
      const kas = await this.kas.findOne({
        where: { source: 'Penjualan:' + order.invNumber },
      });
      if (kas) {
        const payloadKas = {
          date: payload.date,
          description: 'Penjualan dengan No. Invoice ' + order.invNumber,
          debit: payload.total,
          source: 'Penjualan:' + order.invNumber,
          credit: 0,
        };
        await this.kas.update(kas.id, payloadKas);
      } else {
        if (payload.status === 'Completed') {
          const payloadKas = {
            date: payload.date,
            description: 'Penjualan dengan No. Invoice ' + order.invNumber,
            debit: payload.total,
            source: 'Penjualan:' + order.invNumber,
            credit: 0,
          };
          await this.kas.save(payloadKas);
        } else if (payload.status === 'Canceled') {
          await this.kas.softDelete(kas.id);
        }
      }

      await queryRunner.commitTransaction();
      return {
        message: 'Update order successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: string): Promise<IResponse> {
    try {
      const order = await this.repository.findOneBy({ id });
      if (!order) {
        throw new NotFoundException('Order Not Found');
      }
      if (order) {
        order.orderDetails.map(async (detail) => {
          const productValue = await this.product.findValueProductByUnit(
            detail.productId,
            detail.unitId,
          );
          const quantity = productValue.value * detail.quantity;
          const increment = this.stock.increment(detail.productId, quantity);
          if (increment) {
            await this.repository.delete({ id });
          }
        });
        const kas = await this.kas.findOne({
          where: { source: 'Penjualan:' + order.invNumber },
        });
        if (kas) {
          await this.kas.softDelete(kas.id);
        }
      }
      return {
        message: 'Delete order successfully',
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

  async softDelete(id: string): Promise<IResponse> {
    try {
      const order = await this.repository.findOneBy({ id });
      if (!order) {
        throw new NotFoundException('Order Not Found');
      }
      if (order) {
        order.orderDetails.map(async (detail) => {
          const productValue = await this.product.findValueProductByUnit(
            detail.productId,
            detail.unitId,
          );
          const quantity = productValue.value * detail.quantity;
          const increment = this.stock.increment(detail.productId, quantity);
          if (increment) {
            await this.repository.softDelete({ id });
          }
        });
      }
      const kas = await this.kas.findOne({
        where: { source: 'Penjualan:' + order.invNumber },
      });
      if (kas) {
        await this.kas.softDelete(kas.id);
      }
      return {
        message: 'Soft delete order successfully',
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

  async restoreSoftDelete(id: string): Promise<IResponse> {
    try {
      const order = await this.repository.findOne({
        where: { id },
        withDeleted: true,
      });
      if (!order) {
        throw new NotFoundException('Order Not Found');
      }
      const kas = await this.kas.findOne({
        where: { source: 'Penjualan:' + order.invNumber },
      });
      if (kas) {
        await this.kas.recover({ id: kas.id });
      }
      if (order) {
        order.orderDetails.map(async (detail) => {
          const productValue = await this.product.findValueProductByUnit(
            detail.productId,
            detail.unitId,
          );
          const quantity = productValue.value * detail.quantity;
          const increment = this.stock.decrement(detail.productId, quantity);
          if (increment) {
            await this.repository.recover({ id });
          }
        });
      }
      return {
        message: 'Restore order successfully',
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
