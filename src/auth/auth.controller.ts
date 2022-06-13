import { Controller, Get, Post, Body, UseGuards, Req, Logger } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth.login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import RoleGuard from './roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @Get()
  @UseGuards(RoleGuard('Marketing'))
  async test() {
    return 'Success!';
  }

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  @UseGuards(RoleGuard('Marketing'))
  me(@Req() req: Request) {
    return 'You are logged in';
  }
}
