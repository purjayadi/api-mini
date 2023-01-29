import { Injectable } from '@nestjs/common';
import { CreateReturDto } from './dto/create-retur.dto';
import { UpdateReturDto } from './dto/update-retur.dto';

@Injectable()
export class ReturService {
  create(createReturDto: CreateReturDto) {
    return 'This action adds a new retur';
  }

  findAll() {
    return `This action returns all retur`;
  }

  findOne(id: number) {
    return `This action returns a #${id} retur`;
  }

  update(id: number, updateReturDto: UpdateReturDto) {
    return `This action updates a #${id} retur`;
  }

  remove(id: number) {
    return `This action removes a #${id} retur`;
  }
}
