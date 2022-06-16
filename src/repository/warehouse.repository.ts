import { Warehouse } from './../warehouse/entities/warehouse.entity';
import { BaseAbstractRepository } from './base/base.abstract.repository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WarehouseRepositoryInterface } from './interface/warehouse.repository.interface';

@Injectable()
export class WarehouseRepository
  extends BaseAbstractRepository<Warehouse>
  implements WarehouseRepositoryInterface
{
  constructor(
    @InjectRepository(Warehouse)
    private readonly warehouseRepository: Repository<Warehouse>,
  ) {
    super(warehouseRepository);
  }
}
