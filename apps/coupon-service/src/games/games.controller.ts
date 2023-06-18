import { Body, Controller, Post } from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dtos/createGame.dto';

@Controller('api/games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Post()
  async createGame(@Body() createGameDto: CreateGameDto) {
    const game = await this.gamesService.createGame(createGameDto);
    return game;
  }
}
