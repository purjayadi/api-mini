import { Stock } from './../stock/entities/stock.entity';
import { paginateResponse } from 'src/utils/hellper';
import { ProductService } from './../product/product.service';
import { StockService } from './../stock/stock.service';
import { PurchaseOrder } from './entities/purchase.entity';
import { DataSource, Repository } from 'typeorm';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {
  CreatePurchaseDto,
  FindPurchaseDto,
  UpdatePurchaseDto,
} from './purchase.dto';
import { IPaginate, IResponse } from '../interface/response.interface';
import { PurchaseOrderLine } from './entities/purchaseLine.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @Inject('PURCHASE_REPOSITORY')
    private readonly repository: Repository<PurchaseOrder>,
    private readonly stock: StockService,
    private readonly product: ProductService,
    @Inject('PURCHASE_ORDER_LINE_REPOSITORY')
    private readonly purchaseLine: Repository<PurchaseOrderLine>,
    @Inject('STOCK_REPOSITORY')
    private readonly stockRepository: Repository<Stock>,
    @Inject('DATA_SOURCE') private readonly connection: DataSource,
  ) {}

  async create(payload: CreatePurchaseDto): Promise<IResponse> {
    try {
      const data = await this.repository.find({
        order: { code: 'DESC' },
        take: 1,
        skip: 0,
        withDeleted: true,
      });
      const lastInvoice =
        data.length > 0
          ? (data[0].code.replace(/^\D+/g, '') as unknown as number)
          : 1000;
      const invNumber = 'INP-' + (Number(lastInvoice) + 1);
      const purchase = await this.repository.save({
        ...payload,
        code: invNumber,
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
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<IResponse> {
    try {
      const purchaseOrder = await this.repository.findOneBy({ id });
      if (!purchaseOrder) {
        throw new NotFoundException('Purchase Order Not Found');
      }
      return { data: purchaseOrder, error: null, status: HttpStatus.OK };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, payload: UpdatePurchaseDto): Promise<IResponse> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const purchaseOrder = await this.repository.findOneBy({ id });
      if (!purchaseOrder) {
        throw new NotFoundException('Purchase Order Not Found');
      }
      purchaseOrder.purchaseLines.map(async (detail) => {
        const productValue = await this.product.findValueProductByUnit(
          detail.productId,
          detail.unitId,
        );
        const stock = await this.stock.findOne(detail.productId);
        if (stock) {
          const quantity = productValue.value * detail.quantity;
          await this.stockRepository.decrement(
            { productId: detail.productId },
            'quantity',
            quantity,
          );
          Logger.log(`Decrement stock success ${quantity}`);
        }
      });
      const newPurchase = {
        date: payload.date,
        discount: payload.discount,
        total: payload.total,
        supplierId: payload.supplierId,
        userId: payload.userId,
        warehouseId: payload.warehouseId,
      };

      const purchaseLines = [];
      payload.purchaseLines.map(async (line) => {
        purchaseLines.push({
          purchaseOrderId: id,
          productId: line.productId,
          unitId: line.unitId,
          quantity: line.quantity,
          price: line.price,
          subTotal: line.subTotal,
        });
      });
      await this.purchaseLine.delete({ purchaseOrderId: id });
      await this.purchaseLine.save(purchaseLines);
      await this.repository.update(id, newPurchase);
      payload.purchaseLines.map(async (detail) => {
        const productValue = await this.product.findValueProductByUnit(
          detail.productId,
          detail.unitId,
        );
        const stock = await this.stock.findOne(detail.productId);
        if (stock) {
          const quantity = productValue.value * detail.quantity;
          await this.stockRepository.increment(
            { productId: detail.productId },
            'quantity',
            quantity,
          );
          Logger.log(`Increase stock success ${quantity}`);
        }
      });
      await queryRunner.commitTransaction();
      return {
        message: 'Update purchase order successfully',
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
      const purchaseOrder = await this.repository.findOneBy({ id });
      if (!purchaseOrder) {
        throw new NotFoundException('Purchase Order Not Found');
      }
      purchaseOrder.purchaseLines.map(async (detail) => {
        const productValue = await this.product.findValueProductByUnit(
          detail.productId,
          detail.unitId,
        );
        const quantity = productValue.value * detail.quantity;
        const increment = this.stock.decrement(detail.productId, quantity);
        Logger.log(`Decrement stock success ${quantity}`);
        if (increment) {
          await this.repository.delete({ id });
        }
      });
      return {
        message: 'Remove purchase order successfully',
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
