import { PartialType } from '@nestjs/swagger';

import CreateOfferDto from './create-offer.dto.js';

export default class UpdateOfferDto extends PartialType(CreateOfferDto) {}
