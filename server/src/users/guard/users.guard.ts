import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { jwtConstant } from '../constants/jwtConstant';


@Injectable()
export class UsersGuard implements CanActivate {

  constructor(private readonly jwtService: JwtService){}

  async canActivate( context: ExecutionContext ): Promise<boolean>{
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)

    if(!token) throw new UnauthorizedException()
    
    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: jwtConstant.secret
        }
      )
    } catch (error) {
      return error
    }
    return true;
  }


private extractTokenFromHeader(request: Request) {
    const authorizationHeader = request.headers['authorization'];
    const [type, token] = authorizationHeader?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
}


}
