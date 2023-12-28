import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { type TUser, userToTUser } from '~common/types.js';
import HashService from '~modules/hash/hash.service.js';
import Wish from '~modules/wishes/entities/wish.entity.js';

import CreateUserDto from './dto/create-users.dto.js';
import FindUserDto from './dto/find-user.dto.js';
import UpdateUsersDto from './dto/update-users.dto.js';
import User from './entities/user.entity.js';

@Injectable()
export default class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  private async existUser(username: string, email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: [{ username }, { email }],
    });
    return !!user;
  }

  async save(dto: CreateUserDto): Promise<TUser> {
    const existUser = await this.existUser(dto.username, dto.email);

    if (existUser) {
      throw new BadRequestException(
        'User with this email or username already exists',
      );
    }

    const user = await this.userRepository.save({
      username: dto.username,
      about: dto.about,
      avatar: dto.avatar,
      email: dto.email,
      password: await this.hashService.getHash(dto.password),
    });
    return userToTUser(user);
  }

  async findOne(searchIndex: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: [{ email: searchIndex }, { username: searchIndex }],
    });
    if (!user) {
      throw new BadRequestException('Cannot find user');
    }
    return user;
  }

  async findOneById(id: number): Promise<TUser> {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new BadRequestException('Cannot find user');
    }
    return userToTUser(user);
  }

  async update(id: number, dto: UpdateUsersDto): Promise<TUser> {
    const user = await this.findOneById(id);
    if (dto.username && dto.username !== user.username) {
      const isUsernameExist = await this.findOne(dto.username);
      if (isUsernameExist)
        throw new BadRequestException(
          'A user with this username is already registered',
        );
    }
    if (dto.email && dto.email !== user.email) {
      const isEmailExist = await this.findOne(dto.email);
      if (isEmailExist)
        throw new BadRequestException(
          'A user with this email is already registered',
        );
    }
    if (dto.password) {
      dto.password = await this.hashService.getHash(dto.password);
    }

    await this.userRepository.update(id, dto);
    return this.findOneById(id);
  }

  async getWishes(username: string): Promise<Wish[]> {
    const user = await this.userRepository.findOne({
      where: { username },
      select: ['wishes'],
      relations: ['wishes', 'wishes.owner', 'wishes.offers'],
    });
    if (!user) {
      throw new BadRequestException('Cannot find user');
    }
    return user.wishes;
  }

  find(dto: FindUserDto): Promise<TUser[]> {
    return this.userRepository.find({
      where: [
        { username: Like(`%${dto.query}%`) },
        { email: Like(`%${dto.query}%`) },
      ],
    });
  }
}
