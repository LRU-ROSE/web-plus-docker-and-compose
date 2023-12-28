import type User from '~modules/users/entities/user.entity.js';

export type TUser = Pick<
  User,
  'id' | 'username' | 'about' | 'avatar' | 'email' | 'createdAt' | 'updatedAt'
>;

export const userToTUser = (user: User): TUser => ({
  id: user.id,
  username: user.username,
  about: user.about,
  avatar: user.avatar,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export type TUserPayload = {
  id: number;
  username: string;
};
export type TUserRequest = { user: TUserPayload };
export type TToken = { access_token: string };
