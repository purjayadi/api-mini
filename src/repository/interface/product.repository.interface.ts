import { Unit } from './../../product/entities/unit.entity';
import { Product } from './../../product/entities/product.entity';
import { BaseInterfaceRepository } from '../base/base.interface.repository';

export type ProductRepositoryInterface = BaseInterfaceRepository<Product>;

// unit
export type UnitRepositoryInterface = BaseInterfaceRepository<Unit>;
