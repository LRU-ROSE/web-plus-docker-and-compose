import { IsEmail, IsUrl, Length } from 'class-validator';
import { Column, Entity, OneToMany, Relation } from 'typeorm';

import BaseEntity from '~common/base-entity.js';

import type Offer from '~modules/offers/entities/offer.entity.js';
import type Wish from '~modules/wishes/entities/wish.entity.js';
import type Wishlist from '~modules/wishlists/entities/wishlist.entity.js';

@Entity()
export default class User extends BaseEntity {
  @Column({ unique: true })
  @Length(2, 30)
  username: string;

  @Column({ default: 'Пока ничего не рассказал о себе' })
  @Length(2, 200)
  about: string;

  @Column({ default: 'https://i.pravatar.cc/300' })
  @IsUrl()
  avatar: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @OneToMany('Wish', 'owner')
  wishes: Relation<Wish[]>;

  @OneToMany('Offer', 'user')
  offers: Relation<Offer[]>;

  @OneToMany('Wishlist', 'owner')
  wishlists: Relation<Wishlist[]>;
}
