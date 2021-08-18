import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

  constructor(
    private readonly jwtService: JwtService
  ) {
    super();
  }
  
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    let renew = false;
    const refreshToken = req.body.refreshToken;
    try {
      this.jwtService.verify(token);
    } catch(e) {
      if (e.message.includes('expired')) {
        renew = true;
      }
    }
  
    if (renew && refreshToken) {
      try {
        const data = this.jwtService.verify( refreshToken, {
          secret: process.env.JWT_REFRESH_TOKEN_SECRET
        });
        const renewToken = this.jwtService.sign({ sub: data.sub });
        req.headers['authorization'] = `Bearer ${renewToken}`;
        res.renewToken = renewToken;
      } catch (e) {
        throw e || new UnauthorizedException();
      }
    }

    res.renew = renew;
    return super.canActivate(context);
  }

  handleRequest(err, user, info: Error) {
    // FEATURES: Handle role of user
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
