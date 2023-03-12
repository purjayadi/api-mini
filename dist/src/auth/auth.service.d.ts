import { User } from 'src/user/entities/user.entity';
import { IResponse } from '../utils/interfaces/response.interface';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './dto/auth.login.dto';
import { Repository } from 'typeorm';
export declare class AuthService {
    private jwtService;
    private readonly repository;
    constructor(jwtService: JwtService, repository: Repository<User>);
    login(authLoginDto: AuthLoginDto): Promise<IResponse>;
    validateUser(authLoginDto: AuthLoginDto): Promise<any>;
    checkAllPermission(id: string): Promise<User>;
    me(): Promise<{
        message: string;
        error: any;
    }>;
}
