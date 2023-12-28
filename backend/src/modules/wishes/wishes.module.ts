import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UsersModule from '~modules/users/users.module.js';

import Wish from './entities/wish.entity.js';
import WishesController from './wishes.controller.js';
import WishesService from './wishes.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Wish]), UsersModule],
  controllers: [WishesController],
  providers: [WishesService],
  exports: [WishesService],
})
export default class WishesModule {}
