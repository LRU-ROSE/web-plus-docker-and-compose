import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import JwtAuthGuard from '~modules/auth/guards/jwt-auth.guard.js';

import CreateWishDto from './dto/create-wish.dto.js';
import UpdateWishDto from './dto/update-wish.dto.js';
import WishesService from './wishes.service.js';

import type { TWish } from './types.js';
import type { TUserRequest } from '~common/types.js';

@Controller('wishes')
export default class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Request() { user }: TUserRequest,
    @Body() dto: CreateWishDto,
  ): Promise<TWish> {
    return this.wishesService.create(user.id, dto);
  }

  @Get('last')
  findLast(): Promise<TWish[]> {
    return this.wishesService.findLast();
  }

  @Get('top')
  findTop(): Promise<TWish[]> {
    return this.wishesService.findTop();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<TWish> {
    return this.wishesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateWishDto): Promise<TWish> {
    return this.wishesService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  removeOne(
    @Param('id') id: number,
    @Request() { user }: TUserRequest,
  ): Promise<TWish> {
    return this.wishesService.removeOne(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/copy')
  copy(
    @Param('id') id: number,
    @Request() { user }: TUserRequest,
  ): Promise<TWish> {
    return this.wishesService.copy(id, user);
  }
}
