import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Campaign, Customer, EcouponUser, Game } from '@app/common';
import { firstValueFrom, catchError, lastValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { CreateGameDto } from './dtos/createGame.dto';

@Injectable()
export class GamesService {
  constructor(private readonly httpService: HttpService) {}
  private SECRET = 'secret';
  private COUPON_SERVICE_ENDPOINT = 'http://localhost:8080/api/';

  async getGameById(gameId: number) {
    const url = this.COUPON_SERVICE_ENDPOINT + `games/id/${gameId}`;
    const config = {
      headers: {
        Authorization: 'Basic ' + this.SECRET,
      },
    };
    try {
      console.log(`fetching game ${gameId}`);
      const { data } = await firstValueFrom(
        this.httpService.get<any>(url, config).pipe(
          catchError((error: AxiosError) => {
            console.log(error.response.data);
            throw 'An error happened!';
          }),
        ),
      );
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async getGameList() {
    const url = this.COUPON_SERVICE_ENDPOINT + `games`;
    const config = {
      headers: {
        Authorization: 'Basic ' + this.SECRET,
      },
    };
    try {
      console.log(`fetching all games`);
      const { data } = await firstValueFrom(
        this.httpService.get<any[]>(url, config).pipe(
          catchError((error: AxiosError) => {
            console.log(error.response.data);
            throw 'An error happened!';
          }),
        ),
      );
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async createGame(createGameDto: CreateGameDto, user: Customer) {
    const { data, statusCode, message } = await this.sendCreateRequest(
      createGameDto,
      user,
    );
    console.log(message);
    if (!data) throw new HttpException(message, statusCode);
    return data;
  }

  private async sendCreateRequest(
    createGameDto: CreateGameDto,
    user: Customer,
  ) {
    const url = this.COUPON_SERVICE_ENDPOINT + 'games/';

    createGameDto.vendorCode = user.group.code;

    const config = {
      headers: {
        Authorization: 'Basic ' + this.SECRET,
        'Content-Type': 'application/json',
      },
    };
    try {
      console.log('creating new game');
      const { data, status, statusText } = await lastValueFrom(
        this.httpService.post(url, createGameDto, config),
      );
      return { data: data, statusCode: status, message: statusText };
    } catch (err) {
      console.log('failed to create new game: ' + err);
      return err.response.data;
    }
  }
}
