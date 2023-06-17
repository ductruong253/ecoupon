import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EcouponUser, Game, GamePlay } from '@app/common';

@Module({
  imports: [TypeOrmModule.forFeature([Game, GamePlay, EcouponUser])],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
