import { Game, GameStatuses } from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dtos/createGame.dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game) private readonly gameRepo: Repository<Game>,
  ) {}

  async createGame(createGameDto: CreateGameDto) {
    const game = this.gameRepo.create(createGameDto);
    game.status = GameStatuses.ACTIVE;
    await this.gameRepo.save(game);
    return game;
  }
}
