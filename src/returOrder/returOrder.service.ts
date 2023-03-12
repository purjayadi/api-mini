import { Kas } from 'src/accounting/entities/kas.entity';
import { PiutangService } from 'src/piutang/piutang.service';
import { Stock } from './../stock/entities/stock.entity';
import { ProductService } from './../product/product.service';
import { FilterDto } from './../dto/filters.dto';
import { StockService } from './../stock/stock.service';
import { Repository, DataSource, Like } from 'typeorm';
import { paginateResponse } from './../utils/hellper';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IPaginate, IResponse } from '../interface/response.interface';
import { ReturOrder } from './entities/returOrder.entity';
import { ReturOrderDetail } from './entities/returOrderDetail.entity';
import { CreateReturOrderDTO, UpdateReturOrderDTO } from './returOrder.dto';

@Injectable()
export class ReturOrderService {
  constructor(
    @Inject('RETUR_ORDER_REPOSITORY')
    private readonly repository: Repository<ReturOrder>,
    private readonly product: ProductService,
    private readonly piutang: PiutangService,
    @Inject('RETUR_ORDER_DETAIL_REPOSITORY')
    private readonly detail: Repository<ReturOrderDetail>,
    @Inject('DATA_SOURCE') private readonly connection: DataSource,
    private readonly stock: StockService,
    @Inject('STOCK_REPOSITORY')
    private readonly stockRepository: Repository<Stock>,

    @Inject('KAS_REPOSITORY')
    private readonly kas: Repository<Kas>,
  ) {}

  async findAll(payload: FilterDto): Promise<IPaginate | IResponse> {
    try {
      const { offset, limit, search } = payload;
      const returOrders = await this.repository.findAndCount({
        ...(limit && { take: limit }),
        ...(offset && { skip: (offset - 1) * limit }),
        relations: {
          user: {
            role: false,
          },
          returOrderDetails: {
            product: {
              prices: false,
            },
          },
        },
        ...(search && {
          where: [
            {
              order: { invNumber: Like(`%${search}%`) },
            },
          ],
        }),
      });
      return paginateResponse(returOrders, offset, limit, null, HttpStatus.OK);
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(payload: CreateReturOrderDTO): Promise<IResponse> {
    try {
      const count = await this.repository.count();
      const number = 1000;
      const code = 'ROC-' + (count + number + 1);
      const returOrder = await this.repository.save({
        ...payload,
        code: code,
      });
      if (returOrder) {
        if (payload.isIncrementStock) {
          returOrder.returOrderDetails.map(async (detail) => {
            const productValue = await this.product.findValueProductByUnit(
              detail.productId,
              detail.unitId,
            );
            const quantity = productValue.value * detail.quantity;
            this.stock.increment(detail.productId, quantity);
          });
        }
        if (payload.isDecreasePiutang) {
          const findPiutang = await this.piutang.findPiutangByOrder(
            payload.orderId,
          );
          await this.piutang.decrementPiutang({
            id: findPiutang.data.id,
            amount: payload.total,
          });
        }
        if (payload.isDecreaseKas) {
          const kas = {
            date: payload.date,
            description: 'Retur penjualan dengan No. Retur ' + code,
            source: 'Retur:' + code,
            debit: payload.total,
            credit: 0,
            categoryId: payload.categoryId,
          };
          await this.kas.save(kas);
        }
      }
      return {
        message: 'Create retur order successfully',
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
      const returOrder = await this.repository.findOneBy({ id });
      if (!returOrder) {
        throw new NotFoundException('Data Not Found');
      }
      return { data: returOrder, error: null, status: HttpStatus.OK };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, payload: UpdateReturOrderDTO): Promise<IResponse> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const returOrder = await this.repository.findOneBy({ id });
      if (!returOrder) {
        throw new NotFoundException('Data Not Found');
      }
      returOrder.returOrderDetails.map(async (detail) => {
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
        orderId: payload.orderId,
        total: payload.total,
        description: payload.description,
      };
      const newOrderDetail = [];
      payload.returOrderDetails?.map(async (detail) => {
        newOrderDetail.push({
          returOrderId: id,
          productId: detail.productId,
          price: detail.price,
          quantity: detail.quantity,
          unitId: detail.unitId,
          subTotal: detail.subTotal,
        });
      });
      await this.detail.delete({ returOrderId: id });
      await this.detail.save(newOrderDetail);
      await this.repository.update(id, newOrder);
      payload.returOrderDetails.map(async (detail) => {
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

      await queryRunner.commitTransaction();
      return {
        message: 'Update data successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<IResponse> {
    try {
      const returOrder = await this.repository.findOneBy({ id });
      if (!returOrder) {
        throw new NotFoundException('Data Not Found');
      }
      const returDelete = await this.repository.delete(id);
      if (returDelete) {
        if (returOrder.isIncrementStock) {
          returOrder.returOrderDetails.map(async (detail) => {
            const productValue = await this.product.findValueProductByUnit(
              detail.productId,
              detail.unitId,
            );
            const quantity = productValue.value * detail.quantity;
            this.stock.decrement(detail.productId, quantity);
          });
        }
        if (returOrder.isDecreaseKas) {
          const kas = await this.kas.findOne({
            where: { source: 'Retur:' + returOrder.code },
          });
          if (kas) {
            await this.kas.delete(kas.id);
          }
        }
        if (returOrder.isDecreasePiutang) {
          const findPiutang = await this.piutang.findPiutangByOrder(
            returOrder.orderId,
          );
          await this.piutang.incrementPiutang({
            id: findPiutang.data.id,
            amount: returOrder.total,
          });
        }
      }
      return {
        message: 'Delete retur order successfully',
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
