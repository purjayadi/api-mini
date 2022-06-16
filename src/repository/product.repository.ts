import { Unit } from './../product/entities/unit.entity';
import { Product } from './../product/entities/product.entity';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ProductRepositoryInterface,
  UnitRepositoryInterface,
} from './interface/product.repository.interface';

@Injectable()
export class ProductRepository
  extends BaseAbstractRepository<Product>
  implements ProductRepositoryInterface
{
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {
    super(productRepository);
  }
}

@Injectable()
export class UnitRepository
  extends BaseAbstractRepository<Unit>
  implements UnitRepositoryInterface
{
  constructor(
    @InjectRepository(Unit)
    private readonly unitRepository: Repository<Unit>,
  ) {
    super(unitRepository);
  }
}
