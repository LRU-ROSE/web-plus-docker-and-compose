import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import JwtAuthGuard from '~modules/auth/guards/jwt-auth.guard.js';

import CreateOfferDto from './dto/create-offer.dto.js';
import OffersService from './offers.service.js';

import type { TOffer } from './types.js';
import type { TUserRequest } from '~common/types.js';

@UseGuards(JwtAuthGuard)
@Controller('offers')
export default class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(
    @Body() dto: CreateOfferDto,
    @Request() { user }: TUserRequest,
  ): Promise<TOffer> {
    return this.offersService.create(dto, user.id);
  }

  @Get()
  findAll(): Promise<TOffer[]> {
    return this.offersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<TOffer> {
    return this.offersService.findOne(id);
  }
}
