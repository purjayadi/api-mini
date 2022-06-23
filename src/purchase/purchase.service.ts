import { paginateResponse } from 'src/utils/hellper';
import { ProductService } from './../product/product.service';
import { StockService } from './../stock/stock.service';
import { randomNumber } from './../utils/hellper';
import { PurchaseOrder } from './entities/purchase.entity';
import { Repository } from 'typeorm';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  CreatePurchaseDto,
  FindPurchaseDto,
  UpdatePurchaseDto,
} from './purchase.dto';
import { IPaginate, IResponse } from '../interface/response.interface';

@Injectable()
export class PurchaseService {
  constructor(
    @Inject('PURCHASE_REPOSITORY')
    private readonly repository: Repository<PurchaseOrder>,
    private readonly stock: StockService,
    private readonly product: ProductService,
    @Inject('PURCHASE_ORDER_LINE_REPOSITORY')
    private readonly pol: Repository<PurchaseOrder>,
  ) {}

  async create(payload: CreatePurchaseDto): Promise<IResponse> {
    try {
      const count = await this.repository.count();
      const number = randomNumber(10000, 99999);
      const code = 'INP-' + (count + number + 1);
      const purchase = await this.repository.save({
        ...payload,
        code: code,
      });
      if (purchase) {
        payload.purchaseLines.map(async (line) => {
          const productValue = await this.product.findValueProductByUnit(
            line.productId,
            line.unitId,
          );
          const quantity = productValue.value * line.quantity;
          this.stock.increment(line.productId, quantity);
        });
      }
      return {
        message: 'Create purchase order successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to create purchase order',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async findAll(payload: FindPurchaseDto): Promise<IResponse | IPaginate> {
    try {
      const { offset, limit } = payload;
      const purchaseOrders = await this.repository.findAndCount({
        ...(limit && { take: limit }),
        ...(offset && { skip: (offset - 1) * limit }),
      });
      return paginateResponse(
        purchaseOrders,
        offset,
        limit,
        null,
        HttpStatus.OK,
      );
    } catch (error) {
      return {
        message: 'Unable to get purchase order',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async findOne(id: string): Promise<IResponse> {
    try {
      const purchaseOrder = await this.repository.findOneBy({ id });
      return { data: purchaseOrder, error: null, status: HttpStatus.OK };
    } catch (error) {
      return {
        message: 'Unable to get purchase order',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async update(id: string, payload: UpdatePurchaseDto): Promise<IResponse> {
    try {
      const purchaseOrder = await this.repository.findOneBy({ id });
      if (!purchaseOrder) {
        return {
          message: 'Purchase order not Found',
          error: null,
          status: HttpStatus.NOT_FOUND,
        };
      }
      await this.repository.update(id, payload);
      return {
        message: 'Update purchase order successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to update purchase order',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async remove(id: string): Promise<IResponse> {
    try {
      const purchaseOrder = await this.repository.findOneBy({ id });
      if (!purchaseOrder) {
        return {
          message: 'Purchase order not Found',
          error: null,
          status: HttpStatus.NOT_FOUND,
        };
      }
      await this.repository.delete(id);
      return {
        message: 'Remove purchase order successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to remove purchase order',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
