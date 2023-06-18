import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { AuthGuard } from '@nestjs/passport';
import { SessionGuard } from '../guards/session.guard';
import { CurrentCustomer } from '../customers/decorators/current-customer.decorator';
import { Customer } from '@app/common';
import { CreateCampaignDto } from 'apps/coupon-service/src/campaigns/dtos/create-campaign.dto';
import { UpdateCampaignDto } from './dtos/updateCampaign.dto';

@Controller('campaigns')
export class CampaignsController {
  constructor(private campaignsService: CampaignsService) {}

  @Get('/')
  @UseGuards(AuthGuard('jwt'), SessionGuard)
  async whoAmI(@CurrentCustomer() user: Customer) {
    const campaigns = await this.campaignsService.fetchCampaigns(user);
    return { campaigns: campaigns };
  }

  @Post('/')
  @UseGuards(AuthGuard('jwt'), SessionGuard)
  async createCampaign(
    @CurrentCustomer() user: Customer,
    @Body() createDto: CreateCampaignDto,
  ) {
    const campaign = await this.campaignsService.createCampaign(createDto, user);
    return { campaign: campaign };
  }

  @Get('/campaignCode/:campaignCode')
  @UseGuards(AuthGuard('jwt'), SessionGuard)
  async getByCode(
    @CurrentCustomer() user: Customer,
    @Param('campaignCode') campaignCode: string,
  ) {
    const campaign = await this.campaignsService.fetchCampaignByCode(
      campaignCode,
      user,
    );
    return { campaign: campaign };
  }

  @Put()
  async updateCampaign(
    @CurrentCustomer() user: Customer,
    @Body() updateDto: UpdateCampaignDto,
  ) {
    const updatedCampaign = await this.campaignsService.updateCampaign(
      updateDto,
      user,
    );
    return { campaign: updatedCampaign };
  }
}
