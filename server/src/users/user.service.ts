import { BadRequestException, Injectable, UnauthorizedException, Body, Param } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm'
import { User } from './user.entity';
import { Repository } from 'typeorm'
import { CreateUserDto, UserRole } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UserDB } from './dto/user.dto';
import { SENDMAIL } from './mail';
import { Token } from './dto/token.dto';
import * as bgcrypt from 'bcrypt'
import * as jwt   from 'jsonwebtoken';
import HTML_TEMPLATE from './mail/template/mail-template';
import { MAIL } from './constants/mailConstants';
import { Carrito } from 'src/carrito/entities/carrito.entity';

@Injectable()
export class UserService {
    constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Carrito) private readonly carritoRepository: Repository<Carrito>,
    private readonly jwtService: JwtService
    ) {}
    
    async register(user: CreateUserDto) {
        const usuario = await this.userRepository.findOneBy({ email: user.email });
      
        if (usuario) {
          return new BadRequestException('Email already registered');
        }
      
        const insertedUser = this.userRepository.create(user);
      
        const carrito = this.carritoRepository.create();
        carrito.usuario = insertedUser;
      
        await this.userRepository.save(insertedUser); // Guardar el usuario primero
        await this.carritoRepository.save(carrito); // Guardar el carrito
      
        // Actualizar el campo carrito del usuario
        insertedUser.carrito = carrito;
        await this.userRepository.save(insertedUser);
      
        const token = await jwt.sign({ email: user.email, sub: user.surname }, 'misecreto', { expiresIn: '1h' });
      
        try {
          const message = 'Dale al botón para iniciar.';
          const link = `http://localhost:3000/api/v1/user/verify/${token}`;
          const options = {
            from: `TESTING <${MAIL}>`,
            to: user.email,
            subject: 'Verifica tu cuenta de T5Social',
            text: message,
            html: HTML_TEMPLATE(link, message),
          };
      
          SENDMAIL(options, () => {});
        } catch (error) {
          return error;
        }
      
        return {
          message: 'User created successfully.',
        };
      }
      

    async login(user: LoginDto) {  
        const usuarioDb = await this.userRepository.findOneBy({ email: user.email });

        if(!usuarioDb) {
            throw new BadRequestException('Invalid mail');
        }

        if(usuarioDb.role == 'unverified'){
            throw new BadRequestException('User not verified')
        }

        const isPasswordValid = await bgcrypt.compare(user.password, usuarioDb.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid password");
        }

        const payload = {email: usuarioDb.email, sub: usuarioDb.name, fullname: usuarioDb.surname}
        const token = await this.jwtService.signAsync(payload)

        return {
            token: token,
            email: usuarioDb.email
        }
    }

    async updateUser(token){
          
        const aux = this.jwtService.decode(token) as Token

        const user: UserDB = await this.userRepository.findOneBy({ email: aux.email });

        if(user){
            user.role = UserRole.USER
        }

        await this.userRepository.save(user)
    }

    async getUserByEmail(email: string){
        return await this.userRepository.findOne({where: {email}})
    }
}