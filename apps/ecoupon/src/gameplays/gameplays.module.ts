import { Module } from '@nestjs/common';
import { GameplaysController } from './gameplays.controller';
import { GameplaysService } from './gameplays.service';
import { EcouponUser, Game, GamePlay } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EcouponUser, GamePlay, Game])],
  controllers: [GameplaysController],
  providers: [GameplaysService]
})
export class GameplaysModule {}
