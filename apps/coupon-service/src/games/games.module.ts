import { Module } from '@nestjs/common';
import { GamesController } from './games.controller';
import { GamesService } from './games.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Campaign, EcouponUser, Game, GamePlay } from '@app/common';
import { CampaignService } from '../campaigns/campaigns.service';

@Module({
  imports: [TypeOrmModule.forFeature([Game, GamePlay, EcouponUser, Campaign])],
  controllers: [GamesController],
  providers: [GamesService, CampaignService],
})
export class GamesModule {}
