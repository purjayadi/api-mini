import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { PermissionAction } from './casl.ability.factory';
import { AuthLoginDto } from './dto/auth.login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CheckPermissions } from './permission.decorator';
import { PermissionsGuard } from './permission.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @Get()
  async test() {
    return 'Success!';
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @Get('/me')
  @CheckPermissions([PermissionAction.CREATE, 'User'])
  me(@Req() req: Request) {
    return this.authService.me();
  }
}
