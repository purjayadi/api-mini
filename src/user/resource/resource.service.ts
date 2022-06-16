import { Resource } from './../entities/resource.entity';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class ResourceService {
  constructor(
    @Inject('RESOURCE_REPOSITORY')
    private repository: Repository<Resource>,
  ) {}

  async findAll(payload: any) {
    try {
      const { offset, limit } = payload;
      const permission = await this.repository.find({
        ...(limit && { take: limit }),
        ...(offset && { skip: offset }),
      });

      return { data: permission, error: null, status: HttpStatus.OK };
    } catch (error) {
      return {
        message: 'Unable to get permission',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
