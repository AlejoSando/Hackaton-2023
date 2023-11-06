import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateViajeDto } from './dto/create-viaje.dto';
import { UpdateViajeDto } from './dto/update-viaje.dto';
import { Viaje } from './entities/viaje.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ViajesService {

  constructor(
    @InjectRepository(Viaje)
    private readonly viajeRepository: Repository<Viaje>,
  ) {}

  create(createViajeDto: CreateViajeDto) {
    return 'This action adds a new viaje';
  }

  async findAll() {
    return await this.viajeRepository.find() ;
  }

  findOne(id: number) {
    return `This action returns a #${id} viaje`;
  }

  update(id: number, updateViajeDto: UpdateViajeDto) {
    return `This action updates a #${id} viaje`;
  }

  remove(id: number) {
    return `This action removes a #${id} viaje`;
  }

  async obtenerViajePorId(viajeId: number): Promise<Viaje> {
    const viaje = await this.viajeRepository.findOneBy({id:viajeId});

    if (!viaje) {
      throw new NotFoundException('Viaje no encontrado');
    }

    return viaje;
  }

}
