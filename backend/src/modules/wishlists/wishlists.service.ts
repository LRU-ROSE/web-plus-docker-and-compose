import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { userToTUser } from '~common/types.js';
import UsersService from '~modules/users/users.service.js';
import WishesService from '~modules/wishes/wishes.service.js';

import CreateWishlistDto from './dto/create-wishlist.dto.js';
import UpdateWishlistDto from './dto/update-wishlist.dto.js';
import Wishlist from './entities/wishlist.entity.js';

import type { TWishlist } from './types.js';

export const wishlistToTWishlist = (wishlist: Wishlist): TWishlist => ({
  ...wishlist,
  owner: userToTUser(wishlist.owner),
});

@Injectable()
export default class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
    private readonly usersService: UsersService,
    private readonly wishesService: WishesService,
  ) {}

  async findAll(): Promise<TWishlist[]> {
    const wishlists = await this.wishlistRepository.find({
      relations: ['owner', 'items'],
    });
    return wishlists.map(wishlistToTWishlist);
  }

  async create(dto: CreateWishlistDto, userId: number): Promise<TWishlist> {
    const user = await this.usersService.findOneById(userId);
    const wishes = await this.wishesService.findManyWithoutRelations(
      dto.itemsId,
    );

    const wishlist = await this.wishlistRepository.save({
      ...dto,
      owner: user,
      items: wishes,
    });
    return wishlistToTWishlist(wishlist);
  }

  async findOne(id: number): Promise<TWishlist> {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
      relations: ['owner', 'items'],
    });

    if (!wishlist) {
      throw new BadRequestException('No wishlist found');
    }

    return wishlistToTWishlist(wishlist);
  }

  async update(
    id: number,
    dto: UpdateWishlistDto,
    userId: number,
  ): Promise<TWishlist> {
    const wishlist = await this.findOne(id);

    if (wishlist.owner.id !== userId) {
      throw new BadRequestException("Cannot change other people's wishlists");
    }
    if (dto.itemsId) {
      const { itemsId, ...restDto } = dto;
      const wishes = await this.wishesService.findManyWithoutRelations(itemsId);
      wishlist.items.push(...wishes);
      await this.wishlistRepository.save(wishlist);
      await this.wishlistRepository.update(id, restDto);
    } else {
      await this.wishlistRepository.update(id, dto);
    }

    return wishlist;
  }

  async removeOne(id: number, userId: number): Promise<TWishlist> {
    const wishlist = await this.findOne(id);
    if (wishlist.owner.id !== userId) {
      throw new BadRequestException("Cannot remove other people's wishlists");
    }
    await this.wishlistRepository.delete(id);
    return wishlist;
  }
}
