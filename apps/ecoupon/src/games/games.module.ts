import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { Game, GamePlay } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Game, GamePlay]), HttpModule],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
