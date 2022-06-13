import { IResponse } from '../../utils/interfaces/response.interface';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CreateUnitDto, FindUnitDto } from '../dto/unit.dto';
import { UnitService } from './unit.service';

@Controller('unit')
export class UnitController {
    constructor(private readonly service: UnitService) { }

    @Post()
    create(@Body() payload: CreateUnitDto) {
        return this.service.create(payload);
    }

    @Get()
    findAll(@Query() payload: FindUnitDto): Promise<IResponse> {
        return this.service.findAll(payload);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.service.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() payload: Partial<CreateUnitDto>) {
        return this.service.update(id, payload);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }
}
