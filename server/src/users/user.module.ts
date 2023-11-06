import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt/dist';
import { jwtConstant } from './constants/jwtConstant';
import { Carrito } from 'src/carrito/entities/carrito.entity';



@Module({
  imports: [TypeOrmModule.forFeature([User, Carrito]), JwtModule.register({
    global: true,
    secret: jwtConstant.secret,
    signOptions: {expiresIn: '1d'}
  })],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
