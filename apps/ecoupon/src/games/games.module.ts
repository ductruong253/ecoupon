import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { Game, GamePlay } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Game, GamePlay])],
  controllers: [GamesController],
  providers: [GamesService]
})
export class GamesModule {}
