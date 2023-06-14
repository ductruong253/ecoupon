import { catchError, firstValueFrom, lastValueFrom } from 'rxjs';
import { CouponInfo, Customer } from '@app/common';
import { HttpService } from '@nestjs/axios';
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dtos/createCoupon.dto';
import { CreateCouponInfoDto } from 'apps/coupon-service/src/coupon-info/dtos/create-coupon-info.dto';
import { AxiosError, AxiosResponse } from 'axios';
import { CustomersService } from '../customers/customers.service';

@Injectable()
export class CouponsService {
  constructor(private readonly httpService: HttpService) {}
  private SECRET = 'secret';
  private COUPON_SERVICE_ENDPOINT = 'http://localhost:8080/api/';

  async fetchCoupons(customer: Customer) {
    const vendorCode = customer.group.code;
    const url =
      this.COUPON_SERVICE_ENDPOINT + `coupon/vendorCode/${vendorCode}`;
    const config = {
      headers: {
        Authorization: 'Basic ' + this.SECRET,
      },
    };
    try {
      console.log('fetching coupons of ' + vendorCode);
      const { data } = await firstValueFrom(
        this.httpService.get<CouponInfo[]>(url, config).pipe(
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

  async fetchCouponByCode(couponCode: string, customer: Customer) {
    const vendorCode = customer.group.code;
    const url =
      this.COUPON_SERVICE_ENDPOINT +
      `coupon/vendorCode/${vendorCode}/couponCode/${couponCode}`;
    const config = {
      headers: {
        Authorization: 'Basic ' + this.SECRET,
      },
    };
    try {
      console.log(`fetching coupon of ${vendorCode} with code ${couponCode}`);
      const { data } = await firstValueFrom(
        this.httpService.get<CouponInfo>(url, config).pipe(
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

  async createCoupon(createDto: CreateCouponInfoDto, user: Customer) {
    const { data, statusCode, message } = await this.sendCreateRequest(
      createDto,
      user,
    );
    console.log(message);
    if (!data) throw new HttpException(message, statusCode);
    return data;
  }

  private async sendCreateRequest(
    createDto: CreateCouponInfoDto,
    user: Customer,
  ) {
    const url = this.COUPON_SERVICE_ENDPOINT + 'coupon/';

    createDto.createdBy = user.id;
    createDto.vendorCode = user.group.code;

    const config = {
      headers: {
        Authorization: 'Basic ' + this.SECRET,
        'Content-Type': 'application/json',
      },
    };
    try {
      console.log('creating coupon ' + createDto.couponCode);
      const { data, status, statusText }: AxiosResponse = await lastValueFrom(
        this.httpService.post(url, createDto, config),
      );
      return { data: data, statusCode: status, message: statusText };
    } catch (err) {
      console.log('failed to create new coupon: ' + err);
      return err.response.data;
    }
  }
}
