import { Stock } from './../stock/entities/stock.entity';
import { OrderDetail } from './entities/orderDetail.entity';
import { ProductService } from './../product/product.service';
import { StockService } from './../stock/stock.service';
import { Repository, Like, DataSource } from 'typeorm';
import { Order } from './entities/order.entity';
import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { CreateOrderDto, FindOrderDto, UpdateOrderDto } from './order.dto';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { paginateResponse } from 'src/utils/hellper';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private readonly repository: Repository<Order>,
    @Inject('ORDER_DETAIL_REPOSITORY')
    private readonly orderDetail: Repository<OrderDetail>,
    private readonly stock: StockService,
    private readonly product: ProductService,
    @Inject('STOCK_REPOSITORY')
    private readonly stockRepository: Repository<Stock>,
    @Inject('DATA_SOURCE') private readonly connection: DataSource,
  ) {}

  async findAll(payload: FindOrderDto): Promise<IResponse | IPaginate> {
    try {
      const { offset, limit, withDeleted, search, orderBy, order } = payload;
      const orders = await this.repository.findAndCount({
        ...(limit && { take: limit }),
        ...(offset && { skip: (offset - 1) * limit }),
        ...(withDeleted === 'true' ? { withDeleted: true } : {}),
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
            {
              date: Like(`%${search}%`),
            },
          ],
        }),
        ...(orderBy && { order: { [orderBy]: order } }),
      });
      return paginateResponse(orders, offset, limit, null, HttpStatus.OK);
    } catch (error) {
      return {
        message: 'Unable to get orders',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async create(payload: CreateOrderDto): Promise<IResponse> {
    const queryRunner = await this.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const data = await this.repository.find({
        order: { invNumber: 'DESC' },
        take: 1,
        skip: 0,
        withDeleted: true,
      });
      const lastInvoice =
        data.length > 0
          ? (data[0].invNumber.replace(/^\D+/g, '') as unknown as number)
          : 1000;
      const invNumber = 'INV-' + (Number(lastInvoice) + 1);
      const order = await this.repository.save({
        ...payload,
        invNumber: invNumber,
      });
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
      await queryRunner.commitTransaction();
      return {
        message: 'Create order successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return {
        message: 'Unable to create order',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    } finally {
      await queryRunner.release();
    }
  }

  async findOne(id: string): Promise<IResponse> {
    try {
      const order = await this.repository.findOneBy({ id });
      if (!order) {
        return {
          message: 'Order not Found',
          error: null,
          status: HttpStatus.NOT_FOUND,
        };
      }
      return { data: order, error: null, status: HttpStatus.OK };
    } catch (error) {
      return {
        message: 'Unable to get order',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async update(id: string, payload: UpdateOrderDto): Promise<IResponse> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const order = await this.repository.findOneBy({ id });
      if (!order) {
        return {
          data: null,
          error: ['Order not Found'],
          status: HttpStatus.NOT_FOUND,
        };
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
      const updateOrder = await this.repository.preload({ ...payload, id: id });
      await this.repository.save(updateOrder);
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

      await queryRunner.commitTransaction();
      return {
        message: 'Update order successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return {
        message: 'Unable to update order',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    } finally {
      await queryRunner.release();
    }
  }

  async remove(id: string): Promise<IResponse> {
    try {
      const order = await this.repository.findOneBy({ id });
      if (!order) {
        return {
          data: null,
          error: ['Order not Found'],
          status: HttpStatus.NOT_FOUND,
        };
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
      }
      return {
        message: 'Delete order successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to delete order',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async softDelete(id: string): Promise<IResponse> {
    try {
      const order = await this.repository.findOneBy({ id });
      if (!order) {
        return {
          data: null,
          error: ['Order not Found'],
          status: HttpStatus.NOT_FOUND,
        };
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
      return {
        message: 'Soft delete order successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to delete order',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async restoreSoftDelete(id: string): Promise<IResponse> {
    try {
      const order = await this.repository.findOne({
        where: { id },
        withDeleted: true,
      });
      if (!order) {
        return {
          data: null,
          error: ['Order not Found'],
          status: HttpStatus.NOT_FOUND,
        };
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
      return {
        message: 'Unable to restore order',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
