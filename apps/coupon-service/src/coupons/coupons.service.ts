import { Campaign, Coupon, EcouponUser } from '@app/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CampaignService } from '../campaigns/campaigns.service';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon) private couponRepo: Repository<Coupon>,
    @InjectRepository(Campaign)
    private campaignService: CampaignService,
  ) {}

  async claimCoupon(campaignCode: string, user: EcouponUser) {
    const campaign = await this.campaignService.linkNewCoupon(campaignCode);
    if (this.checkCouponExists(campaign, user)) {
      const coupon = this.couponRepo.create({
        campaign: campaign,
        user: user,
        claimedAt: new Date(),
      });
      const saved = await this.couponRepo.save(coupon);
      return saved;
    }
  }

  private async checkCouponExists(campaign: Campaign, user: EcouponUser) {
    const coupon = await this.couponRepo.findOneBy({ campaign, user });
    if (coupon)
      throw new BadRequestException(
        'you can only claim 1 coupon of this campaign',
      );
    return true;
  }
}
