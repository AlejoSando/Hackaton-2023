import { Module } from '@nestjs/common';
import { ViajesService } from './viajes.service';
import { ViajesController } from './viajes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Viaje } from './entities/viaje.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Viaje])],
  controllers: [ViajesController],
  providers: [ViajesService],
  exports: [ViajesService]
})
export class ViajesModule {}
