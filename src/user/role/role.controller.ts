import { AssignPermission } from './../dto/role.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateRoleDto } from '../dto/role.dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @Post()
  create(@Body() payload: CreateRoleDto) {
    return this.service.create(payload);
  }

  @Get()
  findAll(@Query() payload: any) {
    return this.service.findAll(payload);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: Partial<CreateRoleDto>,
  ) {
    return this.service.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Post('/assign-permission/:id')
  assignPermission(@Param('id') id: string, @Body() payload: AssignPermission) {
    return this.service.assignPermission(id, payload);
  }
}
