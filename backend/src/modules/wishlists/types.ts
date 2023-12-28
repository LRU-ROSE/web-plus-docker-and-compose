import type WishList from './entities/wishlist.entity.js';
import type { TUser } from '~common/types.js';
import type { TWishWithoutRelations } from '~modules/wishes/types.js';

export type TWishlist = Omit<WishList, 'owner' | 'items'> & {
  owner: TUser;
  items: TWishWithoutRelations[];
};
