import { Inject, Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';

@Injectable()
export class DatabaseService {
  constructor(@Inject('DATA_SOURCE') private readonly connection: DataSource) {}

  async preProduction() {
    try {
      await runSeeders(this.connection);
      return {
        message: 'Pre development successfully',
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
