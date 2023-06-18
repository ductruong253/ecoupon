import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CampaignService } from './campaigns.service';
import { Serialize } from 'apps/coupon-service/src/interceptors/serialize.interceptor';
import { CreateCampaignDto } from './dtos/create-campaign.dto';
import { AuthGuard } from 'apps/coupon-service/src/guards/auth.guard';
import { CampaignDto } from './dtos/campaign.dto';
import { UpdateCampaignDto } from './dtos/update-campaign.dto';

@Controller('api/campaigns/')
@Serialize(CampaignDto)
@UseGuards(AuthGuard)
export class CampaignController {
  constructor(private campaignService: CampaignService) {}

  @Get('vendorCode/:vendorCode/campaignCode/:campaignCode')
  async findCampaignByCode(
    @Param('campaignCode') campaignCode: string,
    @Param('vendorCode') vendorCode: string,
  ) {
    const campaign = await this.campaignService.findOneByVendorCodeCampaignCode(
      vendorCode,
      campaignCode,
    );
    if (!campaign) {
      throw new NotFoundException('Coupon not found');
    }
    return campaign;
  }

  @Get('vendorCode/:vendorCode')
  async findCouponVendorCode(@Param('vendorCode') vendorCode: string) {
    const campaign = await this.campaignService.findByVendorCode(vendorCode);
    if (!campaign) {
      throw new NotFoundException('Campaign not found');
    }
    return campaign;
  }

  @Post()
  async create(@Body() body: CreateCampaignDto) {
    return await this.campaignService.create(body);
  }

  @Put()
  async update(@Body() body: UpdateCampaignDto) {
    return await this.campaignService.updateCampaign(body);
  }

  @Put('vendorCode/:vendorCode/campaignCode/:campaignCode')
  async approveCoupon(
    @Param('campaignCode') campaignCode: string,
    @Param('vendorCode') vendorCode: string,
  ) {
    return await this.campaignService.approveCampaign(vendorCode, campaignCode);
  }

  @Get('linkNewCoupon/campaignCode/:campaignCode')
  async linkNewCoupon(@Param('campaignCode') campaignCode: string) {
    const claimedCampaign = await this.campaignService.linkNewCoupon(
      campaignCode,
    );
    return claimedCampaign;
  }

  @Get('/individuals')
  async getIndividualsCampaigns(@Query('userId') userId: number) {
    const campaigns = await this.campaignService.getIndividualCampaigns(userId);
    return campaigns;
  }

  @Get('campaignId/:campaignId')
  async getCampaignById(@Param('campaignId') campaignId: string) {
    const campaign = await this.campaignService.getById(parseInt(campaignId));
    return campaign;
  }
}
