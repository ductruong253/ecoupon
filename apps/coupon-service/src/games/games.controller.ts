import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get('/vendorCode/:vendorCode')
  async getGamesList(@Param('vendorCode') vendorCode: string) {
    const games = await this.gamesService.listGame(vendorCode);
    return games;
  }

  @Get('/id/:id')
  async getGameDetail(@Param('id') id: string) {
    const game = await this.gamesService.getGameDetail(parseInt(id));
    return game;
  }
}
