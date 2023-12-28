import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';

import DatabaseConfig from '~configs/database.js';
import GlobalConfig from '~configs/global.js';
import LoggerConfig from '~configs/logger.js';
import AuthModule from '~modules/auth/auth.module.js';
import HashModule from '~modules/hash/hash.module.js';
import OffersModule from '~modules/offers/offers.module.js';
import UsersModule from '~modules/users/users.module.js';
import WishesModule from '~modules/wishes/wishes.module.js';
import WishlistsModule from '~modules/wishlists/wishlists.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [GlobalConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: DatabaseConfig,
    }),
    WinstonModule.forRoot(LoggerConfig),
    UsersModule,
    WishesModule,
    WishlistsModule,
    OffersModule,
    AuthModule,
    HashModule,
  ],
  controllers: [],
  providers: [],
})
export default class AppModule {}
