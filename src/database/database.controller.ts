import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Controller, Post, UseGuards } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Controller('pre-production')
export class DatabaseController {
  constructor(private readonly service: DatabaseService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  preProduction() {
    return this.service.preProduction();
  }
}
