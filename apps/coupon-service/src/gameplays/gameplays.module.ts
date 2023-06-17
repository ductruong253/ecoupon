import { Module } from '@nestjs/common';
import { GameplaysController } from './gameplays.controller';
import { GameplaysService } from './gameplays.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game, GamePlay } from '@app/common';

@Module({
  imports: [TypeOrmModule.forFeature([GamePlay, Game])],
  controllers: [GameplaysController],
  providers: [GameplaysService],
})
export class GameplayModule {}
