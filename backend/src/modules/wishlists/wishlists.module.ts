import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UsersModule from '~modules/users/users.module.js';
import WishesModule from '~modules/wishes/wishes.module.js';

import Wishlist from './entities/wishlist.entity.js';
import WishlistsController from './wishlists.controller.js';
import WishlistsService from './wishlists.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Wishlist]), UsersModule, WishesModule],
  controllers: [WishlistsController],
  providers: [WishlistsService],
})
export default class WishlistsModule {}
