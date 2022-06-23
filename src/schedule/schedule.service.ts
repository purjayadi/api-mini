import { paginateResponse } from 'src/utils/hellper';
import { Schedule } from './entities/schedule.entity';
import { Repository } from 'typeorm';
import { randomNumber } from './../utils/hellper';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import {
  CreateScheduleDto,
  findScheduleDto,
  UpdateScheduleDto,
} from './schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @Inject('SCHEDULE_REPOSITORY')
    private readonly repository: Repository<Schedule>,
  ) {}

  async findAll(payload: findScheduleDto): Promise<IResponse | IPaginate> {
    try {
      const { offset, limit } = payload;
      const schedule = await this.repository.findAndCount({
        ...(limit && { take: limit }),
        ...(offset && { skip: (offset - 1) * limit }),
      });
      return paginateResponse(schedule, offset, limit, null, HttpStatus.OK);
    } catch (error) {
      return {
        message: 'Unable to get schedules',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async create(payload: CreateScheduleDto): Promise<IResponse> {
    try {
      const count = await this.repository.count();
      const number = randomNumber(1000, 9999);
      const code = 'NSJ-' + (count + number + 1);
      await this.repository.save({
        ...payload,
        code: code,
      });
      return {
        message: 'Create schedule successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to create schedule',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async findOne(id: string): Promise<IResponse> {
    try {
      const schedule = await this.repository.findOneBy({ id });
      if (!schedule) {
        return {
          message: 'Schedule not Found',
          error: null,
          status: HttpStatus.NOT_FOUND,
        };
      }
      return { data: schedule, error: null, status: HttpStatus.OK };
    } catch (error) {
      return {
        message: 'Unable to get schedule',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async update(id: string, payload: UpdateScheduleDto): Promise<IResponse> {
    try {
      const schedule = await this.repository.findOneBy({ id });
      if (!schedule) {
        return {
          data: null,
          error: ['Schedule not Found'],
          status: HttpStatus.NOT_FOUND,
        };
      }
      await this.repository.update(id, payload);
      return {
        message: 'Update schedule successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to update schedule',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async remove(id: string): Promise<IResponse> {
    try {
      const schedule = await this.repository.findOneBy({ id });
      if (!schedule) {
        return {
          data: null,
          error: ['Schedule not Found'],
          status: HttpStatus.NOT_FOUND,
        };
      }
      await this.repository.delete(id);
      return {
        message: 'Delete schedule successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      return {
        message: 'Unable to delete schedule',
        error: error.message,
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
