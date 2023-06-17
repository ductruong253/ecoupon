import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Campaign } from '@app/common';
import { CreateCampaignDto } from './dtos/create-campaign.dto';
import { ApprovalStatusEnum, CampaignStatusEnum } from '@app/common';
import { UpdateCampaignDto } from './dtos/update-campaign.dto';

@Injectable()
export class CampaignService {
  constructor(@InjectRepository(Campaign) private repo: Repository<Campaign>) {}

  async create(createDto: CreateCampaignDto) {
    if (
      await this.checkExistence(createDto.vendorCode, createDto.campaignCode)
    ) {
      throw new BadRequestException('campaignCode existed');
    }
    const campaign = this.repo.create(createDto);
    console.log('creating new campaign ' + campaign.campaignCode);
    campaign.approvalStatus = ApprovalStatusEnum.PENDING;
    campaign.createdDate = new Date();
    campaign.isActive = false;
    campaign.currentCouponCount = 0;
    campaign.status = CampaignStatusEnum.CREATED;
    this.repo.save(campaign);
    return campaign;
  }

  findOne(id: number) {
    if (!id) return null;
    return this.repo.findOneBy({ id });
  }

  async findOneByVendorCodeCampaignCode(
    vendorCode: string,
    campaignCode: string,
  ) {
    const campaign: Campaign = await this.repo.findOneBy({
      vendorCode,
      campaignCode,
    });
    if (!campaign) throw new NotFoundException('campaign not found');
    return campaign;
  }

  async findByVendorCode(vendorCode: string) {
    const campaign: Campaign[] = await this.repo.findBy({ vendorCode });
    return campaign;
  }

  async updateCampaign(updateDto: UpdateCampaignDto) {
    const existingCampaign: Campaign =
      await this.findOneByVendorCodeCampaignCode(
        updateDto.vendorCode,
        updateDto.campaignCode,
      );
    if (existingCampaign.approvalStatus === ApprovalStatusEnum.APPROVED)
      throw new BadRequestException(
        'updating approved campaign is not allowed',
      );
    existingCampaign.approvalStatus = ApprovalStatusEnum.PENDING;
    existingCampaign.description = updateDto.description;
    existingCampaign.startDate = updateDto.startDate;
    existingCampaign.endDate = updateDto.endDate;
    existingCampaign.couponLimit = updateDto.couponLimit;
    existingCampaign.conditions = updateDto.conditions;
    existingCampaign.type = updateDto.type;
    existingCampaign.maxDiscountValue = updateDto.maxDiscountValue;
    existingCampaign.unit = updateDto.unit;
    existingCampaign.discountPercent = updateDto.discountPercent;
    const updatedCoupon = await this.repo.save(existingCampaign);
    console.log(`Update campaign code ${updateDto.campaignCode} success`);
    return updatedCoupon;
  }

  async approveCampaign(vendorCode: string, campaignCode: string) {
    const campaign: Campaign = await this.findOneByVendorCodeCampaignCode(
      vendorCode,
      campaignCode,
    );
    campaign.approvalStatus = ApprovalStatusEnum.APPROVED;
    return await this.repo.save(campaign);
  }

  private async checkExistence(vendorCode: string, campaignCode: string) {
    console.log('checking for code existance...');
    try {
      const campaign = await this.findOneByVendorCodeCampaignCode(
        vendorCode,
        campaignCode,
      );
      if (campaign) return true;
    } catch (err) {
      console.log(
        `error while checking existance of campaign ${campaignCode}: ${err}`,
      );
    }
    return false;
  }

  async linkNewCoupon(campaignCode: string) {
    const campaign = await this.repo.findOneBy({ campaignCode });
    if (!campaign) throw new BadRequestException('campaign not found');
    if (campaign.status !== CampaignStatusEnum.RELEASED || !campaign.isActive)
      throw new BadRequestException('campaign is not available to be claimed');
    if (
      campaign.couponLimit !== 0 &&
      campaign.currentCouponCount >= campaign.couponLimit
    )
      throw new BadRequestException('coupons limit exceeded for this campaign');

    campaign.currentCouponCount ++;
    await this.repo.save(campaign);
    return campaign;
  }
}
