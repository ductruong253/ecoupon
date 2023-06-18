import { Campaign, Coupon, EcouponUser } from '@app/common';
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { CampaignsService } from '../campaigns/campaigns.service';

@Injectable()
export class CouponsService {
  private SECRET = 'secret';
  private COUPON_SERVICE_ENDPOINT = 'http://localhost:8080/api/';
  constructor(
    @InjectRepository(Coupon) private couponRepo: Repository<Coupon>,
    private readonly campaignsService: CampaignsService,
    private readonly httpService: HttpService,
  ) {}

  async createCoupon(user: EcouponUser, campaignId: number) {
    const campaign = await this.campaignsService.getCampaignById(campaignId);
    if (!campaign) throw new BadRequestException('campaign not found');
    const linkedCampaign = await this.linkNewCoupon(campaign.campaignCode);
    if (!linkedCampaign)
      throw new BadRequestException('campaign is not available to be claimed');
    const coupon = this.couponRepo.create();
    coupon.user = user;
    coupon.campaign = campaign;
    coupon.claimedAt = new Date();
    await this.couponRepo.save(coupon);
    return coupon;
  }

  private async linkNewCoupon(campaignCode: string) {
    const url =
      this.COUPON_SERVICE_ENDPOINT +
      `campaigns/linkNewCoupon/campaignCode/${campaignCode}`;
    const config = {
      headers: {
        Authorization: 'Basic ' + this.SECRET,
      },
    };
    try {
      console.log('linking new coupon to campaign ' + campaignCode);
      const { data } = await firstValueFrom(
        this.httpService.get<Campaign>(url, config).pipe(
          catchError((error) => {
            throw new HttpException(
              error.response.data.message,
              error.response.data.statusCode,
            );
          }),
        ),
      );
      return data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async listCouponsClaimed(user: EcouponUser) {
    const query = this.couponRepo
      .createQueryBuilder()
      .select('coupon')
      .from(Coupon, 'coupon')
      .leftJoinAndSelect('coupon.campaign', 'campaign')
      .where('coupon.userId = :userId', { userId: user.id });
    const coupons = await query.getMany();
    return coupons;
  }
}
