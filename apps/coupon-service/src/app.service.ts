import { Get, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  @Get()
  getHello(): string {
    const secret = this.configService.get('secret');
    return 'OK';
  }
}
