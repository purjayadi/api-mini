import { Stock } from './../stock/entities/stock.entity';
import { ProductService } from './../product/product.service';
import {
  CreateReturPurchaseDto,
  UpdateReturPurchaseDTO,
} from './returPurchase.dto';
import { FilterDto } from './../dto/filters.dto';
import { ReturPurchase } from './entities/returPurchase.entity';
import { StockService } from './../stock/stock.service';
import { Repository, DataSource } from 'typeorm';
import { paginateResponse } from './../utils/hellper';
import {
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { IPaginate, IResponse } from '../interface/response.interface';
import { ReturPurchaseDetail } from './entities/returPurchaseDetail.entity';

@Injectable()
export class ReturPurchaseService {
  constructor(
    @Inject('RETUR_PURCHASE_REPOSITORY')
    private readonly repository: Repository<ReturPurchase>,
    private readonly product: ProductService,
    @Inject('RETUR_PURCHASE_DETAIL_REPOSITORY')
    private readonly detail: Repository<ReturPurchaseDetail>,
    @Inject('DATA_SOURCE') private readonly connection: DataSource,
    private readonly stock: StockService,
    @Inject('STOCK_REPOSITORY')
    private readonly stockRepository: Repository<Stock>,
  ) {}

  async findAll(payload: FilterDto): Promise<IPaginate | IResponse> {
    try {
      const { offset, limit } = payload;
      const returPurchases = await this.repository.findAndCount({
        ...(limit && { take: limit }),
        ...(offset && { skip: (offset - 1) * limit }),
        relations: {
          user: {
            role: false,
          },
          supplier: {},
          returPurchaseDetails: {
            product: {
              prices: false,
            },
          },
        },
      });
      return paginateResponse(
        returPurchases,
        offset,
        limit,
        null,
        HttpStatus.OK,
      );
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async create(payload: CreateReturPurchaseDto): Promise<IResponse> {
    try {
      const count = await this.repository.count();
      const number = 1000;
      const code = 'RBP-' + (count + number + 1);
      const returPurchase = await this.repository.save({
        ...payload,
        code: code,
      });
      if (returPurchase) {
        returPurchase.returPurchaseDetails.map(async (detail) => {
          const productValue = await this.product.findValueProductByUnit(
            detail.productId,
            detail.unitId,
          );
          const quantity = productValue.value * detail.quantity;
          this.stock.decrement(detail.productId, quantity);
        });
      }
      return {
        message: 'Create retur purchase successfully',
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
      const returPurchase = await this.repository.findOneBy({ id });
      if (!returPurchase) {
        throw new NotFoundException('Data Not Found');
      }
      return { data: returPurchase, error: null, status: HttpStatus.OK };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(
    id: string,
    payload: UpdateReturPurchaseDTO,
  ): Promise<IResponse> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const returPurchase = await this.repository.findOneBy({ id });
      if (!returPurchase) {
        throw new NotFoundException('Data Not Found');
      }
      returPurchase.returPurchaseDetails.map(async (detail) => {
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
        supplierId: payload.supplierId,
        total: payload.total,
        description: payload.description,
      };
      const newOrderDetail = [];
      payload.returPurchaseDetails?.map(async (detail) => {
        newOrderDetail.push({
          returPurchaseId: id,
          productId: detail.productId,
          price: detail.price,
          quantity: detail.quantity,
          unitId: detail.unitId,
          subTotal: detail.subTotal,
        });
      });
      await this.detail.delete({ returPurchaseId: id });
      await this.detail.save(newOrderDetail);
      await this.repository.update(id, newOrder);
      payload.returPurchaseDetails.map(async (detail) => {
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
      const returPurchase = await this.repository.findOneBy({ id });
      if (!returPurchase) {
        throw new NotFoundException('Data Not Found');
      }
      const returDelete = await this.repository.delete(id);
      if (returDelete) {
        returPurchase.returPurchaseDetails.map(async (detail) => {
          const productValue = await this.product.findValueProductByUnit(
            detail.productId,
            detail.unitId,
          );
          const quantity = productValue.value * detail.quantity;
          this.stock.increment(detail.productId, quantity);
        });
      }
      return {
        message: 'Delete retur purchase successfully',
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
