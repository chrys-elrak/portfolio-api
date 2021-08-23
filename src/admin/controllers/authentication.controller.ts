import {
  Body,
  Controller,
  NotFoundException,
  Post,
  Query,
  UnauthorizedException,
  UseGuards,
  Req,
  Res
} from '@nestjs/common';
import { IResponse } from 'src/common/interfaces/IResponse';
import { createUserDto } from '../dto/create-user.dto';
import { loginUserDto } from '../dto/login-user.dto';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from '../jwt.auth-guard';

@Controller('/auth')
export class AuthenticationController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  @Post('/login')
  async login(@Body() body: loginUserDto): Promise<IResponse<{ access_token: string }> | NotFoundException | UnauthorizedException> {
    const user: User = await this.userService.getUser({ username: body.login });
    if (!user) {
      throw new NotFoundException('account not found');
    }
    const match = bcrypt.compareSync(body.password, user.password);
    if (!match) {
      throw new UnauthorizedException('password incorect');
    }
    const token = await this.jwtService.sign({ sub: user.id });
    const refreshToken = await this.jwtService.sign({ sub: user.id }, {
      secret: process.env.JWT_REFRESH_TOKEN_SECRET,
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });
    delete user.password;
    return { data: { access_token: token, refreshToken, user }, success: true } as IResponse<{ access_token: string }>;
  }

  @Post('/register')
  async register(@Query() q, @Body() body: createUserDto): Promise<IResponse<User>> {
    if (q.xheadertoken !== process.env.REGISTER_TOKEN_ADMIN) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.createUser(body);
    delete user.username;
    return { success: true, status: 200, data: user } as IResponse<User>;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/refresh-token')
  async renewToken(@Req() req, @Res() res): Promise<IResponse<any>> {
    const user: User = await this.userService.getUserById(req.user.userId);
    delete user.password;
    const data = { token: res.renewToken, refreshToken: req.body.refreshToken, user, renew: res.renew };
    return res.status(200).json({ success: true, status: 200, data }) as IResponse<any>;
  }
}
