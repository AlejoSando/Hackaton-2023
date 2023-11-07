import { Body, Controller, Get, Post, Res, Param, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/register.dto';
import { UserService } from './user.service';
import { HttpStatus } from '@nestjs/common/enums';
import { LoginDto } from './dto/login.dto';
import { UsersGuard } from './guard/users.guard';

@Controller('user')
export class UserController {

    constructor(
        private readonly usersService: UserService){}

    @Get('/login')
    loginget(@Res() res){
        res.send('HolaMundo')
    }

    @Post('register')
    async registrar(@Body() newUser: CreateUserDto, @Res() res){
        try {
            const response = await this.usersService.register(newUser);
            return res.status(HttpStatus.CREATED).send(response)
        } catch (error) {
            if(error.message.includes('Duplicate entry'))
            res.status(HttpStatus.BAD_REQUEST).send({message: 'El nombre de usuario ya existe'})
        }
    }

    @Post("login")
    async login(@Body() user: LoginDto, @Res() res) {
        console.log(user)
        const response = await this.usersService.login(user)
        res.status(HttpStatus.OK).send({message: 'Inicio de sesión exitoso.', ponce: response})
    }

    @Get('verify/:token')
    async verifyUser(@Param('token') token, @Res() res) {
        await this.usersService.updateUser(token)
        console.log(token)
        res.redirect('http://localhost:4200/')
    }
    

}
