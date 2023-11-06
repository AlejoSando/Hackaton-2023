import { MinLength, IsString, IsEmail, IsDate, isNumber, IsNumber } from 'class-validator'
import { Type } from 'class-transformer'

export class Token {

    @IsEmail()
    email: string
    
    @IsString()
    sub: string
    
    @IsNumber()
    iat: number
    
    @IsNumber()
    exp: number

}
