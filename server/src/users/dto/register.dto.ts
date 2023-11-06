import { MinLength, IsString, IsEmail, IsDate } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateUserDto {
    
    @IsEmail()
    email: string
    
    @IsString()
    surname: string
    
    @IsString()
    name: string
    
    @MinLength(6)
    @IsString()
    password: string
    
    @IsDate()
    @Type(()=> Date)
    fec_nac: Date

}

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    UNVERIFIED = 'unverified'
}