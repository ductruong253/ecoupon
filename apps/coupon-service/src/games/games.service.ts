import { Campaign, Game, GameStatuses } from '@app/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dtos/createGame.dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private readonly gameRepo: Repository<Game>,
    @InjectRepository(Campaign)
    private readonly campaignRepo: Repository<Campaign>,
  ) {}

  async createGame(createGameDto: CreateGameDto) {
    const game = this.gameRepo.create(createGameDto);
    game.status = GameStatuses.ACTIVE;
    await this.gameRepo.save(game);
    return game;
  }

  async listGame(vendorcode: string) {
    const games = this.gameRepo.findBy({ vendorCode: vendorcode });
    return games;
  }

  async getGameDetail(id: number) {
    const game = await this.gameRepo.findOneBy({ id });
    if (!game) throw new NotFoundException('game not exists');
    const gameContent = game.gameContent;
    const campaigns = await this.campaignRepo
      .createQueryBuilder()
      .from(Campaign, 'campaign')
      .select(['campaign.id', 'campaign.campaignCode'])
      .where('campaign.id IN (:...ids)', { ids: gameContent })
      .getMany();
    const detailGame = Object.fromEntries(Object.entries(game));
    detailGame.gameContent = campaigns;
    return detailGame;
  }

  async getAllGames() {
    const games = await this.gameRepo.find();
    return games;
  }
}
