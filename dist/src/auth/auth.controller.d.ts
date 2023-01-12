import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth.login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(authLoginDto: AuthLoginDto): Promise<import("../utils/interfaces/response.interface").IResponse>;
    test(): Promise<string>;
    me(req: Request): Promise<{
        message: string;
        error: any;
    }>;
}
