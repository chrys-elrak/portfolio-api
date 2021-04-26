import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { IResponse } from 'src/common/interfaces/IResponse';
import { createUserDto } from '../dto/create-user.dto';
import { loginUserDto } from '../dto/login-user.dto';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('/auth')
export class AuthenticationController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/login')
  async login(@Body() body: loginUserDto): Promise<IResponse<{access_token: string}> | NotFoundException | UnauthorizedException> {
    const user: User = await this.userService.getUser({ username: body.login });
    if (!user) {
      throw new NotFoundException('account not found');
    }
    const match = bcrypt.compareSync(body.password, user.password);
    if (!match) {
      throw new UnauthorizedException('password incorect');
    }
    const token = await this.jwtService.sign({sub: user.id});
    return {data: {access_token: token}, success: true} as IResponse<{access_token: string}>;
  }

  @Post('/register')
  async register(@Body() body: createUserDto): Promise<IResponse<User>> {
    const user = await this.userService.createUser(body);
    return { success: true, status: 200, data: user } as IResponse<User>;
  }
}
