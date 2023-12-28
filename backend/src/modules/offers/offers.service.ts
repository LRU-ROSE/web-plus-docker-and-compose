import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { userToTUser } from '~common/types.js';
import UsersService from '~modules/users/users.service.js';
import WishesService from '~modules/wishes/wishes.service.js';

import CreateOfferDto from './dto/create-offer.dto.js';
import Offer from './entities/offer.entity.js';

import type { TOffer } from './types.js';

const offerToTOffer = (offer: Offer): TOffer => ({
  ...offer,
  user: userToTUser(offer.user),
});

@Injectable()
export default class OffersService {
  constructor(
    @InjectRepository(Offer)
    private readonly offerRepository: Repository<Offer>,
    private readonly usersService: UsersService,
    private readonly wishesService: WishesService,
  ) {}

  async create(dto: CreateOfferDto, userId: number): Promise<TOffer> {
    const user = await this.usersService.findOneById(userId);
    const wish = await this.wishesService.findOne(dto.itemId);
    const donation = Number(wish.raised) + dto.amount;

    if (user.id === wish.owner.id) {
      throw new BadRequestException(
        'Cannot contribute money to your own gifts',
      );
    }

    if (donation > wish.price) {
      throw new BadRequestException(
        'The amount of the donation exceeds the price of the gift',
      );
    }

    await this.wishesService.update(dto.itemId, {
      raised: donation,
    });

    const offer = await this.offerRepository.save({ ...dto, user, item: wish });
    return offerToTOffer(offer);
  }

  async findAll(): Promise<TOffer[]> {
    const offers = await this.offerRepository.find({
      relations: ['user', 'item'],
    });

    return offers.map(offerToTOffer);
  }

  async findOne(id: number): Promise<TOffer> {
    const offer = await this.offerRepository.findOne({ where: { id } });
    if (!offer) {
      throw new BadRequestException('Cannot find offer');
    }
    return offerToTOffer(offer);
  }
}
