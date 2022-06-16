import { IResponse } from '../utils/interfaces/response.interface';
import { UserService } from './../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './dto/auth.login.dto';
import {
  forwardRef,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private jwtService: JwtService,
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
      error: null,
      status: HttpStatus.OK,
    };
  }

  async validateUser(authLoginDto: AuthLoginDto): Promise<any> {
    const { username, password } = authLoginDto;
    const user = await this.userService.findOneByUsername(username);
    const validatePassword = await user?.validatePassword(password);
    if (!user || !validatePassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async checkAllPermission(user: any) {
    const users = await this.userService.checkPermission(user);
    return users;
  }

  async me() {
    return {
      message: 'test',
      error: null,
    };
  }
}
