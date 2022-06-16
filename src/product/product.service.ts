import { randomNumber } from './../utils/hellper';
import { IResponse } from '../utils/interfaces/response.interface';
import { ProductRepositoryInterface } from './../repository/interface/product.repository.interface';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductDto } from './dto/find-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject('ProductRepositoryInterface')
    private readonly repository: ProductRepositoryInterface,
  ) {}

  async findAll(payload: FindProductDto): Promise<IResponse> {
    try {
      const { offset, limit } = payload;
      const Products = await this.repository.findWithRelations({
        ...(limit && { take: limit }),
        ...(offset && { skip: offset }),
      });

      return { data: Products, error: null, status: HttpStatus.OK };
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
      const count = await this.repository.countRecord();
      const number = randomNumber(1000, 9999);
      const code = 'KB-' + (count + number + 1);
      await this.repository.create({
        ...payload,
        code: code,
        prices: payload.price,
      });
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
      const Product = await this.repository.findOneById(id);
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
      const Product = await this.repository.findOneById(id);
      if (!Product) {
        return {
          data: null,
          error: ['Product not Found'],
          status: HttpStatus.NOT_FOUND,
        };
      }
      await this.repository.update(id, payload);
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
      const Product = await this.repository.findOneById(id);
      if (!Product) {
        return {
          data: null,
          error: ['Product not Found'],
          status: HttpStatus.NOT_FOUND,
        };
      }
      await this.repository.remove(id);
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
}
