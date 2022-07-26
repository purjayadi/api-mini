import { ScheduleDetail } from './entities/scheduleDetail.entity';
import { paginateResponse } from 'src/utils/hellper';
import { Schedule } from './entities/schedule.entity';
import { Repository } from 'typeorm';
import { randomNumber } from './../utils/hellper';
import { IResponse, IPaginate } from 'src/interface/response.interface';
import {
  HttpStatus,
  Inject,
  Injectable,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
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
    @Inject('SCHEDULE_DETAIL_REPOSITORY')
    private readonly scheduleDetail: Repository<ScheduleDetail>,
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
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<IResponse> {
    try {
      const schedule = await this.repository.findOneBy({ id });
      if (!schedule) {
        throw new NotFoundException('Schedule not found');
      }
      return { data: schedule, error: null, status: HttpStatus.OK };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, payload: UpdateScheduleDto): Promise<IResponse> {
    try {
      const schedule = await this.repository.findOneBy({ id });
      if (!schedule) {
        throw new NotFoundException('Schedule not found');
      }
      const payloadUpdate = {
        date: payload.date,
        customerId: payload.customerId,
        employeeId: payload.employeeId,
        description: payload.description,
      };
      await this.repository.update(id, payloadUpdate);
      await this.scheduleDetail.delete({ scheduleId: id });
      const detail = [];
      payload.scheduleDetails.map((item: any) => {
        detail.push({
          ...item,
          scheduleId: id,
        });
      });
      await this.scheduleDetail.save(detail);
      return {
        message: 'Update schedule successfully',
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

  async remove(id: string): Promise<IResponse> {
    try {
      const schedule = await this.repository.findOneBy({ id });
      if (!schedule) {
        throw new NotFoundException('Schedule not found');
      }
      await this.repository.delete(id);
      return {
        message: 'Delete schedule successfully',
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
