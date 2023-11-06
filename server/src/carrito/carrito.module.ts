import { Module } from '@nestjs/common';
import { CarritoService } from './carrito.service';
import { CarritoController } from './carrito.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrito } from './entities/carrito.entity';
import { Viaje } from 'src/viajes/entities/viaje.entity';
import { ViajesModule } from 'src/viajes/viajes.module';
import { ViajesController } from 'src/viajes/viajes.controller';
import { ViajesService } from 'src/viajes/viajes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Carrito, Viaje]), ViajesModule],
  controllers: [CarritoController, ViajesController],
  providers: [CarritoService, ViajesService],
})
export class CarritoModule {}
