import { catchError, firstValueFrom, lastValueFrom } from 'rxjs';
import { Campaign, CampaignStatusEnum, Customer } from '@app/common';
import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { CreateCampaignDto } from 'apps/coupon-service/src/campaigns/dtos/create-campaign.dto';
import { AxiosError, AxiosResponse } from 'axios';
import { UpdateCampaignDto } from './dtos/updateCampaign.dto';

@Injectable()
export class CampaignsService {
  constructor(private readonly httpService: HttpService) {}
  private SECRET = 'secret';
  private COUPON_SERVICE_ENDPOINT = 'http://localhost:8080/api/';

  async fetchCoupons(customer: Customer) {
    const vendorCode = customer.group.code;
    const url =
      this.COUPON_SERVICE_ENDPOINT + `campaigns/vendorCode/${vendorCode}`;
    const config = {
      headers: {
        Authorization: 'Basic ' + this.SECRET,
      },
    };
    try {
      console.log('fetching campaigns of ' + vendorCode);
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

  async fetchCouponByCode(campaignCode: string, customer: Customer) {
    const vendorCode = customer.group.code;
    const url =
      this.COUPON_SERVICE_ENDPOINT +
      `campaigns/vendorCode/${vendorCode}/campaignCode/${campaignCode}`;
    const config = {
      headers: {
        Authorization: 'Basic ' + this.SECRET,
      },
    };
    try {
      console.log(
        `fetching campaign of ${vendorCode} with code ${campaignCode}`,
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

  async createCoupon(createDto: CreateCampaignDto, user: Customer) {
    const { data, statusCode, message } = await this.sendCreateRequest(
      createDto,
      user,
    );
    console.log(message);
    if (!data) throw new HttpException(message, statusCode);
    return data;
  }

  private async sendCreateRequest(
    createDto: CreateCampaignDto,
    user: Customer,
  ) {
    const url = this.COUPON_SERVICE_ENDPOINT + 'campaigns/';

    createDto.createdBy = user.fullName;
    createDto.vendorCode = user.group.code;

    const config = {
      headers: {
        Authorization: 'Basic ' + this.SECRET,
        'Content-Type': 'application/json',
      },
    };
    try {
      console.log('creating campaign ' + createDto.campaignCode);
      const { data, status, statusText }: AxiosResponse = await lastValueFrom(
        this.httpService.post(url, createDto, config),
      );
      return { data: data, statusCode: status, message: statusText };
    } catch (err) {
      console.log('failed to create new campaign: ' + err);
      return err.response.data;
    }
  }

  async updateCampaign(updateDto: UpdateCampaignDto, user: Customer) {
    updateDto.vendorCode = user.group.code;
    updateDto.status = CampaignStatusEnum.CREATED;
    const { data, statusCode, message } = await this.sendUpdateRequest(
      updateDto,
      user,
    );
    console.log(message);
    if (!data) throw new HttpException(message, statusCode);
    return data;
  }

  private async sendUpdateRequest(
    updateDto: UpdateCampaignDto,
    user: Customer,
  ) {
    const url = this.COUPON_SERVICE_ENDPOINT + 'campaigns/';
    const config = {
      headers: {
        Authorization: 'Basic ' + this.SECRET,
        'Content-Type': 'application/json',
      },
    };
    try {
      console.log('updating campaign ' + updateDto.campaignCode);
      const { data, status, statusText }: AxiosResponse = await lastValueFrom(
        this.httpService.put(url, updateDto, config),
      );
      return { data: data, statusCode: status, message: statusText };
    } catch (err) {
      console.log('failed to update campaign: ' + err);
      return err.response.data;
    }
  }
}
