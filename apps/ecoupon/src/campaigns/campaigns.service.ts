import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Campaign, EcouponUser } from '@app/common';
import { firstValueFrom, catchError } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class CampaignsService {
  constructor(private readonly httpService: HttpService) {}
  private SECRET = 'secret';
  private COUPON_SERVICE_ENDPOINT = 'http://localhost:8080/api/';

  async getCampaignById(campaignId: number) {
    const url =
      this.COUPON_SERVICE_ENDPOINT + `campaigns/campaignId/${campaignId}`;
    const config = {
      headers: {
        Authorization: 'Basic ' + this.SECRET,
      },
    };
    try {
      console.log(
        `fetching campaign ${campaignId}`,
      );
      const { data } = await firstValueFrom(
        this.httpService.get<Campaign>(url, config).pipe(
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

  async fetchIndividualCampaigns(user: EcouponUser) {
    const url =
      this.COUPON_SERVICE_ENDPOINT + `campaigns/individuals?userId=${user.id}`;
    const config = {
      headers: {
        Authorization: 'Basic ' + this.SECRET,
      },
    };
    try {
      console.log('fetching campaigns for user ' + user.id);
      const { data } = await firstValueFrom(
        this.httpService.get<Campaign[]>(url, config).pipe(
          catchError((error: AxiosError) => {
            console.log(error.response.data);
            throw 'An error happened!';
          }),
        ),
      );
      return data;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}
