import { Length, MaxLength } from 'class-validator';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  Relation,
} from 'typeorm';

import BaseEntity from '~common/base-entity.js';

import type User from '~modules/users/entities/user.entity.js';
import type Wish from '~modules/wishes/entities/wish.entity.js';

@Entity()
export default class Wishlist extends BaseEntity {
  @Column()
  @Length(1, 250)
  name: string;

  @Column({ nullable: true })
  @MaxLength(1500)
  description: string;

  @Column()
  image: string;

  @ManyToOne('User', 'wishlists')
  owner: Relation<User>;

  @ManyToMany('Wish')
  @JoinTable()
  items: Relation<Wish[]>;
}
