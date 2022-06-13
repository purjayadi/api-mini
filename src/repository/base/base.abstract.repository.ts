import { BaseInterfaceRepository } from './base.interface.repository';
import { DeleteResult, Repository } from 'typeorm';
export abstract class BaseAbstractRepository<T> implements BaseInterfaceRepository<T> {

    private entity: Repository<T>;

    protected constructor(entity: Repository<T>) {
        this.entity = entity;
    }

    public async removeCOndition(condition: any): Promise<any> {
        return await this.entity.delete(condition);
    }

    public async create(data: T | any): Promise<T> {
        return await this.entity.save(data);
    }

    public async update(id: string, data: any): Promise<any> {
        return await this.entity.update(id, data);
    }

    public async findOneById(id: any): Promise<T> {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return await this.entity.findOneBy({ id });
    }

    public async findByCondition(filterCondition: any): Promise<T> {
        return await this.entity.findOne({ where: filterCondition });
    }

    public async findWithRelations(relations: any): Promise<T[]> {
        return await this.entity.find(relations)
    }

    public async remove(id: string): Promise<DeleteResult> {
        return await this.entity.delete(id);
    }

    public async countByCondition(condition: any): Promise<number> {
        return await this.entity.count(condition);
    }

    public async countRecord(): Promise<number> {
        return await this.entity.count();
    }

    public async findAll(): Promise<T[]> {
        return await this.entity.find();
    }

}