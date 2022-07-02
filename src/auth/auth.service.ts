import { User } from 'src/user/entities/user.entity';
import { IResponse } from '../utils/interfaces/response.interface';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './dto/auth.login.dto';
import {
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject('USER_REPOSITORY')
    private readonly repository: Repository<User>,
  ) {}

  async login(authLoginDto: AuthLoginDto): Promise<IResponse> {
    const user = await this.validateUser(authLoginDto);
    const payload = {
      id: user.id,
    };
    const token = this.jwtService.sign(payload);
    return {
      message: 'Login successfully',
      access_token: token,
      data: user,
      error: null,
      status: HttpStatus.OK,
    };
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<any> {
    const { username, password } = authLoginDto;
    const user = await this.repository.findOneBy({ username });
    const validatePassword = await user?.validatePassword(password);
    if (!user || !validatePassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async checkAllPermission(id: string) {
    try {
      const users = await this.repository.findOne({
        where: {
          id: id,
        },
      });
      return users;
    } catch (error) {
      Logger.error(error);
    }
  }

  async me() {
    return {
      message: 'test',
      error: null,
    };
  }
}
