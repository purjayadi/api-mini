import { paginateResponse } from 'src/utils/hellper';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import {
  HttpStatus,
  Inject,
  Injectable,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { IResponse, IPaginate } from 'src/interface/response.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly repository: Repository<User>,
  ) {}

  async findAll(payload: FindUserDto): Promise<IResponse | IPaginate> {
    try {
      const { offset, limit } = payload;
      const user = await this.repository.findAndCount({
        relations: {
          role: true,
        },
        ...(limit && { take: limit }),
        ...(offset && { skip: (offset - 1) * limit }),
      });
      return paginateResponse(user, offset, limit, null, HttpStatus.OK);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(payload: CreateUserDto): Promise<IResponse> {
    try {
      await this.repository.save(this.repository.create(payload));
      return {
        message: 'Create user successfully',
        error: null,
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string): Promise<IResponse> {
    try {
      const user = await this.repository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return { data: user, error: null, status: HttpStatus.OK };
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ? HttpStatus.NOT_FOUND : HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, payload: UpdateUserDto): Promise<IResponse> {
    try {
      const user = await this.repository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      await this.repository.update(id, payload);
      return {
        message: 'Update user successfully',
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
      const user = await this.repository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      await this.repository.delete(id);
      return {
        message: 'Delete user successfully',
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

  async findOneByUsername(username: string): Promise<any> {
    const user = await this.repository.findBy({
      username: username,
    });
    return user;
  }

  // check permission
  async checkPermission(id: string) {
    try {
      const users = await this.repository.findOneBy({ id });
      return users;
    } catch (error) {
      throw error;
    }
  }
}
