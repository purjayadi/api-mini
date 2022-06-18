import { IResponse } from 'src/utils/interfaces/response.interface';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto, FindOrderDto, UpdateOrderDto } from './order.dto';

@Injectable()
export class OrderService {
  constructor(
    @Inject('ORDER_REPOSITORY')
    private readonly repository: Repository<Order>,
  ) {}

  async findAll(payload: FindOrderDto): Promise<IResponse> {
    try {
      const { offset, limit } = payload;
      const orders = await this.repository.find({
        ...(limit && { take: limit }),
        ...(offset && { skip: offset }),
      });

      return { data: orders, error: null, status: HttpStatus.OK };
    } catch (error) {
      return {
        message: 'Unable to get orders',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async create(payload: CreateOrderDto): Promise<IResponse> {
    try {
      const count = await this.repository.count();
      const number = 1000;
      const invNumber = 'INV-' + (count + number + 1);
      await this.repository.save({
        ...payload,
        invNumber: invNumber,
      });
      return {
        message: 'Create order successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to create order',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
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
    try {
      const order = await this.repository.findOneBy({ id });
      if (!order) {
        return {
          data: null,
          error: ['Order not Found'],
          status: HttpStatus.NOT_FOUND,
        };
      }
      await this.repository.update(id, payload);
      return {
        message: 'Update order successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to update order',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
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
      await this.repository.delete({ id });
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
}
