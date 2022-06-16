import { DeleteResult } from 'typeorm';

export interface BaseInterfaceRepository<T> {
  create(data: T | any): Promise<T>;

  update(id: string, data: any): Promise<any>;

  findOneById(id: string): Promise<T>;

  findByCondition(filterCondition: any): Promise<T>;

  remove(id: string): Promise<DeleteResult>;

  findWithRelations(relations: any): Promise<T[]>;

  countByCondition(condition: any): Promise<number>;

  countRecord(): Promise<number>;

  findAll(): Promise<T[]>;

  saveWithListener(data: T | any): Promise<T>;
}
