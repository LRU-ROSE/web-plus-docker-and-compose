import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { jwtOptions } from '~configs/jwt.js';
import HashModule from '~modules/hash/hash.module.js';
import UsersModule from '~modules/users/users.module.js';

import AuthController from './auth.controller.js';
import AuthService from './auth.service.js';
import GUARDS from './guards/index.js';
import { STRATEGIES } from './strategies/index.js';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync(jwtOptions()),
    UsersModule,
    HashModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, ...STRATEGIES, ...GUARDS],
})
export default class AuthModule {}
