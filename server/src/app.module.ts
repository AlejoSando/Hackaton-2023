import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm'
import { CarritoModule } from './carrito/carrito.module';
import { ViajesModule } from './viajes/viajes.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    username: 'root',
    password: '',
    port: 3306,
    database: 'bat5',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true
  }),UserModule, CarritoModule, ViajesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
