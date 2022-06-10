import { PartialType } from '@nestjs/mapped-types';
import { CreateReturDto } from './create-retur.dto';

export class UpdateReturDto extends PartialType(CreateReturDto) {}
