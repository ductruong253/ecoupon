import { EcouponUser } from '@app/common';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SessionGuard } from '../guards/session.guard';
import { CurrentUser } from '../user/decorators/current-user.decorator';
import { CampaignsService } from './campaigns.service';


@Controller('campaigns')
export class CampaignsController {
  constructor(private campaignsService: CampaignsService) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'), SessionGuard)
  async fetchIndividualCampaigns(@CurrentUser() user: EcouponUser) {
    const campaigns = await this.campaignsService.fetchIndividualCampaigns(user);
    return { campaigns: campaigns };
  }
}
