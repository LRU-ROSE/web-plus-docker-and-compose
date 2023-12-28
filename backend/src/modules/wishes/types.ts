import { type TUser, userToTUser } from '~common/types.js';

import type Wish from './entities/wish.entity.js';

export type TWish = Omit<Wish, 'owner'> & { owner: TUser };
export type TWishWithoutRelations = Omit<Wish, 'owner' | 'offers'>;

export const wishToTWish = (wish: Wish): TWish => ({
  ...wish,
  owner: userToTUser(wish.owner),
});
