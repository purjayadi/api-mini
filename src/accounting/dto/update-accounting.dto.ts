import { PartialType } from '@nestjs/mapped-types';
import { CreateAccountingDto } from './create-accounting.dto';

export class UpdateAccountingDto extends PartialType(CreateAccountingDto) {}
