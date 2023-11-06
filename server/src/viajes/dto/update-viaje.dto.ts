import { PartialType } from '@nestjs/mapped-types';
import { CreateViajeDto } from './create-viaje.dto';

export class UpdateViajeDto extends PartialType(CreateViajeDto) {}
