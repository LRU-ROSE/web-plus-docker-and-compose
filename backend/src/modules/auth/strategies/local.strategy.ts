import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import HashService from '~modules/hash/hash.service.js';
import UsersService from '~modules/users/users.service.js';

import type { TUserPayload } from '~common/types.js';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UsersService,
    private hashService: HashService,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<TUserPayload> {
    const user = await this.userService.findOne(username);

    if (!user || !(await this.hashService.compare(password, user.password))) {
      throw new UnauthorizedException('Incorrect username or password');
    }

    return { id: user.id, username };
  }
}
