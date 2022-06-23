import { StockService } from './../stock/stock.service';
import { Repository } from 'typeorm';
import { paginateResponse, randomNumber } from './../utils/hellper';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { Product } from './entities/product.entity';
import { Price } from './entities/price.entity';
import { IPaginate, IResponse } from '../interface/response.interface';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private readonly repository: Repository<Product>,

    @Inject('PRODUCT_PRICE_REPOSITORY')
    private readonly price: Repository<Price>,

    private readonly stock: StockService,
  ) {}

  async findAll(payload: FindProductDto): Promise<IPaginate | IResponse> {
    try {
      const { offset, limit } = payload;
      const Products = await this.repository.findAndCount({
        ...(limit && { take: limit }),
        ...(offset && { skip: (offset - 1) * limit }),
      });
      return paginateResponse(Products, offset, limit, null, HttpStatus.OK);
    } catch (error) {
      return {
        message: 'Unable to get Product',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async create(payload: CreateProductDto): Promise<IResponse> {
    try {
      const count = await this.repository.count();
      const number = randomNumber(1000, 9999);
      const code = 'KB-' + (count + number + 1);
      const product = await this.repository.save({
        ...payload,
        code: code,
        prices: payload.prices,
      });
      if (product) {
        await this.stock.increment(product.id, 0);
      }
      return {
        message: 'Create Product successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to create Product',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async findOne(id: string): Promise<IResponse> {
    try {
      const Product = await this.repository.findOneBy({ id });
      if (!Product) {
        return {
          message: 'Product not Found',
          error: null,
          status: HttpStatus.NOT_FOUND,
        };
      }
      return { data: Product, error: null, status: HttpStatus.OK };
    } catch (error) {
      return {
        message: 'Unable to get Product',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async update(id: string, payload: UpdateProductDto): Promise<IResponse> {
    try {
      const Product = await this.repository.findOneBy({ id });
      if (!Product) {
        return {
          data: null,
          error: ['Product not Found'],
          status: HttpStatus.NOT_FOUND,
        };
      }
      const newPayload = {
        ...payload,
        id: id,
      };
      const updatedProduct = this.repository.preload(newPayload);
      await this.repository.save(await updatedProduct);
      return {
        message: 'Update Product successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to update Product',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async remove(id: string): Promise<IResponse> {
    try {
      const Product = await this.repository.findOneBy({ id });
      if (!Product) {
        return {
          data: null,
          error: ['Product not Found'],
          status: HttpStatus.NOT_FOUND,
        };
      }
      await this.repository.delete(id);
      return {
        message: 'Delete Product successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to delete Product',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  findValueProductByUnit(productId: string, unitId: string): Promise<Price> {
    const price = this.price.findOne({
      where: { productId: productId, unitId: unitId },
    });
    return price;
  }
}
