import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UsersModule from '~modules/users/users.module.js';
import WishesModule from '~modules/wishes/wishes.module.js';

import Offer from './entities/offer.entity.js';
import OffersController from './offers.controller.js';
import OffersService from './offers.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([Offer]), UsersModule, WishesModule],
  controllers: [OffersController],
  providers: [OffersService],
})
export default class OffersModule {}
