import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength, IsOptional } from "class-validator";

export class LoginDto {
  
  @IsEmail()
  email: string;  

  @IsString()
  @MinLength(6)
  @Transform(({ value }) => value.trim())
  password: string;

}
