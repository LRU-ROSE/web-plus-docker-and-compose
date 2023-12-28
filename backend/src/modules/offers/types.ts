import type Offer from './entities/offer.entity.js';
import type { TUser } from '~common/types.js';

export type TOffer = Omit<Offer, 'user'> & { user: TUser };
