import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { CreateCarritoDto } from './dto/create-carrito.dto';
import { UpdateCarritoDto } from './dto/update-carrito.dto';
import { ViajesService } from 'src/viajes/viajes.service';

@Controller('carrito')
export class CarritoController {
  constructor(private readonly carritoService: CarritoService,
    private readonly viajeService: ViajesService) {}

  @Post()
  create(@Body() createCarritoDto: CreateCarritoDto) {
    return this.carritoService.create(createCarritoDto);
  }

  @Get()
  findAll() {
    return this.carritoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carritoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarritoDto: UpdateCarritoDto) {
    return this.carritoService.update(+id, updateCarritoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carritoService.remove(+id);
  }

 
  @Post('comprar/:carritoId/agregar-viaje/:viajeId')
  async agregarViajeAlCarrito(
    @Param('carritoId') carritoId: number,
    @Param('viajeId') viajeId: number,
  ) {
    const carrito = await this.carritoService.obtenerCarritoPorId(carritoId);
    const viaje = await this.viajeService.obtenerViajePorId(viajeId);

    if (!carrito || !viaje) {
      throw new NotFoundException('Carrito o viaje no encontrado');
    }

    await this.carritoService.agregarViajeAlCarrito(carrito, viaje);

    const carritoActualizado = await this.carritoService.obtenerCarritoPorId(carritoId);

    return { message: 'Viaje agregado al carrito exitosamente', carrito: carritoActualizado };
  }

  /*@Post('comprar/:carritoId/eliminar-viaje/:viajeId')
  async eliminarViajeAlCarrito(
    @Param('carritoId') carritoId: number,
    @Param('viajeId') viajeId: number,
  ) {
    const carrito = await this.carritoService.obtenerCarritoPorId(carritoId);
    const viaje = await this.viajeService.obtenerViajePorId(viajeId);

    if (!carrito || !viaje) {
      throw new NotFoundException('Carrito o viaje no encontrado');
    }

    await this.carritoService.agregarViajeAlCarrito(carrito, viaje);

    const carritoActualizado = await this.carritoService.obtenerCarritoPorId(carritoId);

    return { message: 'Viaje agregado al carrito exitosamente', carrito: carritoActualizado };
  }*/
  
}
