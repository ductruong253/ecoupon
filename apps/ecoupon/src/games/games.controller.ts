import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GamesService } from './games.service';
import { AuthGuard } from '@nestjs/passport';
import { SessionGuard } from '../guards/session.guard';

@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), SessionGuard)
  async listGame() {
    const games = await this.gamesService.getGameList();
    return { games: games };
  }

  @Get('/id/:id')
  @UseGuards(AuthGuard('jwt'), SessionGuard)
  async getGameDetails(@Param('id') id: number) {
    const game = await this.gamesService.getGameById(id);
    return { game: game };
  }
}
