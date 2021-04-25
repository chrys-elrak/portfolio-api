import { Controller, Post } from '@nestjs/common';

@Controller('/auth')
export class AuthenticationController {
    @Post('/login')
    async login() {}

    @Post('/register')
    async register() {}
}
