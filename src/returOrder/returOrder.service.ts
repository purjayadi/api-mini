import { Stock } from './../stock/entities/stock.entity';
import { ProductService } from './../product/product.service';
import { FilterDto } from './../dto/filters.dto';
import { StockService } from './../stock/stock.service';
import { Repository, DataSource } from 'typeorm';
import { paginateResponse } from './../utils/hellper';
import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
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
    @Inject('RETUR_ORDER_DETAIL_REPOSITORY')
    private readonly detail: Repository<ReturOrderDetail>,
    @Inject('DATA_SOURCE') private readonly connection: DataSource,
    private readonly stock: StockService,
    @Inject('STOCK_REPOSITORY')
    private readonly stockRepository: Repository<Stock>,
  ) {}

  async findAll(payload: FilterDto): Promise<IPaginate | IResponse> {
    try {
      const { offset, limit } = payload;
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
      });
      return paginateResponse(returOrders, offset, limit, null, HttpStatus.OK);
    } catch (error) {
      return {
        message: 'Unable to get retur purchases',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async create(payload: CreateReturOrderDTO): Promise<IResponse> {
    try {
      const count = await this.repository.count();
      const number = 1000;
      const code = 'ROC-' + (count + number + 1);
      const data = {
        ...payload,
        code,
      };
      console.log(data);
      const returOrder = await this.repository.save({
        ...payload,
        code: code,
      });
      if (returOrder) {
        returOrder.returOrderDetails.map(async (detail) => {
          const productValue = await this.product.findValueProductByUnit(
            detail.productId,
            detail.unitId,
          );
          const quantity = productValue.value * detail.quantity;
          this.stock.decrement(detail.productId, quantity);
        });
      }
      return {
        message: 'Create retur order successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to create retur order',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async findOne(id: string): Promise<IResponse> {
    try {
      const returOrder = await this.repository.findOneBy({ id });
      if (!returOrder) {
        return {
          message: 'Product not Found',
          error: null,
          status: HttpStatus.NOT_FOUND,
        };
      }
      return { data: returOrder, error: null, status: HttpStatus.OK };
    } catch (error) {
      return {
        message: 'Unable to get retur order',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async update(id: string, payload: UpdateReturOrderDTO): Promise<IResponse> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const returOrder = await this.repository.findOneBy({ id });
      if (!returOrder) {
        return {
          data: null,
          error: ['Data not Found'],
          status: HttpStatus.NOT_FOUND,
        };
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
        customerId: payload.customerId,
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
      return {
        message: 'Unable to update data',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async remove(id: string): Promise<IResponse> {
    try {
      const returOrder = await this.repository.findOneBy({ id });
      if (!returOrder) {
        return {
          data: null,
          error: ['Retur purchase not Found'],
          status: HttpStatus.NOT_FOUND,
        };
      }
      const returDelete = await this.repository.delete(id);
      if (returDelete) {
        returOrder.returOrderDetails.map(async (detail) => {
          const productValue = await this.product.findValueProductByUnit(
            detail.productId,
            detail.unitId,
          );
          const quantity = productValue.value * detail.quantity;
          this.stock.increment(detail.productId, quantity);
        });
      }
      return {
        message: 'Delete retur order successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to delete retur order',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
