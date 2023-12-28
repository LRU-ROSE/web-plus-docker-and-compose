import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import HashModule from '~modules/hash/hash.module.js';

import User from './entities/user.entity.js';
import UsersController from './users.controller.js';
import UsersService from './users.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([User]), HashModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export default class UsersModule {}
