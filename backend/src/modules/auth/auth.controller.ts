import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import AuthService from './auth.service.js';
import SignUpDto from './dto/sign-up.dto.js';
import LocalAuthGuard from './guards/local-auth.guard.js';

import type { TToken, TUser } from '~common/types.js';

@Controller()
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignUpDto): Promise<TUser> {
    return this.authService.signup(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  signin(@Request() req: { user: TUser }): Promise<TToken> {
    return this.authService.signin(req.user);
  }
}
