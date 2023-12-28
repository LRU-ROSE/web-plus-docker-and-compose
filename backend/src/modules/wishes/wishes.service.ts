import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { type TUserPayload } from '~common/types.js';
import UsersService from '~modules/users/users.service.js';

import CreateWishDto from './dto/create-wish.dto.js';
import UpdateWishDto from './dto/update-wish.dto.js';
import Wish from './entities/wish.entity.js';
import {
  type TWish,
  type TWishWithoutRelations,
  wishToTWish,
} from './types.js';

@Injectable()
export default class WishesService {
  constructor(
    @InjectRepository(Wish) private readonly wishRepository: Repository<Wish>,
    private readonly userService: UsersService,
  ) {}

  async create(id: number, dto: CreateWishDto): Promise<TWish> {
    const user = await this.userService.findOneById(id);
    const wish = await this.wishRepository.save({
      ...dto,
      owner: user,
    });
    return wishToTWish(wish);
  }

  async findLast(): Promise<TWish[]> {
    const wishes = await this.wishRepository.find({
      order: { createdAt: 'DESC' },
      take: 40,
      relations: ['owner', 'offers'],
    });
    return wishes.map(wishToTWish);
  }

  async findTop(): Promise<TWish[]> {
    const wishes = await this.wishRepository.find({
      take: 10,
      order: { copied: 'desc' },
      relations: ['owner', 'offers'],
    });
    return wishes.map(wishToTWish);
  }

  async findOne(id: number): Promise<TWish> {
    const wish = await this.wishRepository.findOne({
      where: { id },
      relations: ['owner', 'offers', 'offers.user'],
    });
    if (!wish) {
      throw new BadRequestException('No gift found');
    }
    return wishToTWish(wish);
  }

  async update(wishId: number, dto: UpdateWishDto): Promise<TWish> {
    const wish = await this.findOne(wishId);
    if (dto.price && wish.offers.length > 0) {
      throw new BadRequestException('Cannot change the value of the gift');
    }
    await this.wishRepository.update(wishId, dto);
    return this.findOne(wishId);
  }

  async removeOne(wishId: number, user: TUserPayload): Promise<TWish> {
    const wish = await this.findOne(wishId);
    if (user && wish.owner.id !== user.id) {
      throw new BadRequestException('No gift found');
    }
    if (wish.offers.length > 0) {
      throw new BadRequestException('Cannot delete gift with started donation');
    }
    await this.wishRepository.delete(wishId);
    return wish;
  }

  async copy(wishId: number, user: TUserPayload): Promise<TWish> {
    const oldWish = await this.findOne(wishId);
    const owner = await this.userService.findOneById(user.id);
    await this.wishRepository.update(oldWish.id, {
      copied: oldWish.copied + 1,
    });
    const wish = await this.wishRepository.save({
      name: oldWish.name,
      link: oldWish.link,
      image: oldWish.image,
      price: oldWish.price,
      description: oldWish.description,
      owner,
    });
    return wishToTWish(wish);
  }

  async findManyWithoutRelations(
    giftsId: number[],
  ): Promise<TWishWithoutRelations[]> {
    return await this.wishRepository.find({
      where: { id: In(giftsId) },
    });
  }
}
