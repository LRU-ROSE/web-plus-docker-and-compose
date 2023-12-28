import {
  IsDecimal,
  IsNumber,
  IsPositive,
  IsUrl,
  Length,
} from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany, Relation } from 'typeorm';

import BaseEntity from '~common/base-entity.js';

import type Offer from '~modules/offers/entities/offer.entity.js';
import type User from '~modules/users/entities/user.entity.js';

@Entity()
export default class Wish extends BaseEntity {
  @Column()
  @Length(1, 250)
  name: string;

  @Column()
  @IsUrl()
  link: string;

  @Column()
  @IsUrl()
  image: string;

  @Column()
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsPositive()
  price: number;

  @Column({ default: 0 })
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsPositive()
  raised: number;

  @Column()
  @Length(1, 1024)
  description: string;

  @Column({ default: 0 })
  @IsDecimal()
  copied: number;

  @ManyToOne('User', 'wishes')
  owner: Relation<User>;

  @OneToMany('Offer', 'item')
  offers: Relation<Offer[]>;
}
