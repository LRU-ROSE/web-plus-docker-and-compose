import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import UsersService from '~modules/users/users.service.js';

import SignUpDto from './dto/sign-up.dto.js';

import type { TToken, TUser } from '~common/types.js';

@Injectable()
export default class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(dto: SignUpDto): Promise<TUser> {
    return this.userService.save(dto);
  }

  async signin(user: TUser): Promise<TToken> {
    const token = this.jwtService.sign({
      id: user.id,
      username: user.username,
    });
    return {
      access_token: token,
    };
  }
}
