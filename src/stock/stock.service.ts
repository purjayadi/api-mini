import { IResponse } from 'src/utils/interfaces/response.interface';
import { Repository } from 'typeorm';
import { Inject, Injectable, HttpStatus, Logger } from '@nestjs/common';
import { Stock } from './entities/stock.entity';

@Injectable()
export class StockService {
  constructor(
    @Inject('STOCK_REPOSITORY')
    private readonly repository: Repository<Stock>,
  ) {}

  async findAll(payload: any): Promise<IResponse> {
    try {
      const { offset, limit } = payload;
      const Products = await this.repository.find({
        relations: {
          product: true,
        },
        ...(limit && { take: limit }),
        ...(offset && { skip: offset }),
      });

      return { data: Products, error: null, status: HttpStatus.OK };
    } catch (error) {
      return {
        message: 'Unable to get stock',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async increment(productId: string, quantity: number) {
    try {
      const stock = await this.repository.findOneBy({
        productId: productId,
      });
      if (stock) {
        stock.quantity += quantity;
        await this.repository.save(stock);
        Logger.log('Increment stock successfully');
        return true;
      } else {
        const newStock = new Stock();
        newStock.productId = productId;
        newStock.quantity = quantity;
        await this.repository.save(newStock);
        Logger.log('Create initial stock successfully');
        return true;
      }
    } catch (error) {
      Logger.log(error);
      return false;
    }
  }

  async decrement(productId: string, quantity: number) {
    try {
      const stock = await this.repository.findOneBy({
        productId: productId,
      });
      if (stock) {
        stock.quantity -= quantity;
        await this.repository.save(stock);
        Logger.log('Decrement stock successfully');
      } else {
        Logger.log('Stock not found');
      }
    } catch (error) {
      Logger.log(error);
    }
  }

  async findOne(id: string): Promise<Stock> {
    const stock = await this.repository.findOne({
      where: {
        productId: id,
      },
    });
    return stock;
  }
}
