import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCarritoDto } from './dto/create-carrito.dto';
import { UpdateCarritoDto } from './dto/update-carrito.dto';
import { Carrito } from './entities/carrito.entity';
import { Repository } from 'typeorm';
import { Viaje } from 'src/viajes/entities/viaje.entity';

@Injectable()
export class CarritoService {

  constructor(
    @InjectRepository(Carrito)
    private readonly carritoRepository: Repository<Carrito>
  ) {}

  create(createCarritoDto: CreateCarritoDto) {
    return 'This action adds a new carrito';
  }

  findAll() {
    return `This action returns all carrito`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carrito`;
  }

  update(id: number, updateCarritoDto: UpdateCarritoDto) {
    return `This action updates a #${id} carrito`;
  }

  remove(id: number) {
    return `This action removes a #${id} carrito`;
  }


  async agregarViajeAlCarrito(carrito: Carrito, viaje: Viaje): Promise<void> {
    if (!carrito.viajes.includes(viaje)) {
      carrito.viajes.push(viaje);
      carrito.precioTotal += viaje.costo;
      await this.carritoRepository.save(carrito);
    }
  }
  

  async eliminarViajeAlCarrito(carrito: Carrito, viaje: Viaje): Promise<void> {
    if(!carrito.viajes.includes(viaje)) 
    carrito.viajes = []
    carrito.viajes.push(viaje);
    carrito.precioTotal += viaje.costo;

    await this.carritoRepository.save(carrito);
  }

  async obtenerCarritoPorId(carritoId: number): Promise<Carrito> {
    const carrito = await this.carritoRepository.findOne({
      where: { id: carritoId },
      relations: ['viajes'], 
    });
  
    if (!carrito) {
      throw new NotFoundException('Carrito no encontrado');
    }
  
    return carrito;
  }
  
}
