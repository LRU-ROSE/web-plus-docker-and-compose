import { IsNumber } from 'class-validator';
import { Column, Entity, ManyToOne, Relation } from 'typeorm';

import BaseEntity from '~common/base-entity.js';

import type User from '~modules/users/entities/user.entity.js';
import type Wish from '~modules/wishes/entities/wish.entity.js';

@Entity()
export default class Offer extends BaseEntity {
  @Column()
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  amount: number;

  @Column({ default: false })
  hidden: boolean;

  @ManyToOne('User', 'offers')
  user: Relation<User>;

  @ManyToOne('Wish', 'offers')
  item: Relation<Wish>;
}
