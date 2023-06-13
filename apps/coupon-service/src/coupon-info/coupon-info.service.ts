import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CouponInfo } from '@app/common';
import { CreateCouponInfoDto } from './dtos/create-coupon-info.dto';
import { ApprovalStatusEnum, CouponStatusEnum } from '@app/common';
import { UpdateCouponInfoDto } from './dtos/update-coupon-info.dto';

@Injectable()
export class CouponInfoService {
  constructor(
    @InjectRepository(CouponInfo) private repo: Repository<CouponInfo>,
  ) {}

  async create(createDto: CreateCouponInfoDto) {
    if (await this.checkExistence(createDto.vendorCode, createDto.couponCode)) {
      throw new BadRequestException('couponCode existed');
    }
    const couponInfo = this.repo.create(createDto);
    console.log('creating new coupon ' + couponInfo.couponCode);
    couponInfo.approvalStatus = ApprovalStatusEnum.PENDING;
    couponInfo.createdDate = new Date();
    couponInfo.isActive = false;
    couponInfo.currentVoucherCount = 0;
    couponInfo.status = CouponStatusEnum.CREATED;
    this.repo.save(couponInfo);
    return couponInfo;
  }

  findOne(id: number) {
    if (!id) return null;
    return this.repo.findOneBy({ id });
  }

  async findOneByVendorCodeCouponCode(vendorCode: string, couponCode: string) {
    const coupon: CouponInfo = await this.repo.findOneBy({
      vendorCode,
      couponCode,
    });
    if (!coupon) throw new NotFoundException('coupon not found');
    return coupon;
  }

  async findByVendorCode(vendorCode: string) {
    const coupon: CouponInfo[] = await this.repo.findBy({ vendorCode });
    return coupon;
  }

  async updateCouponInfo(updateDto: UpdateCouponInfoDto) {
    const existingCoupon: CouponInfo = await this.findOneByVendorCodeCouponCode(
      updateDto.vendorCode,
      updateDto.couponCode,
    );
    if (existingCoupon.approvalStatus === ApprovalStatusEnum.APPROVED)
      throw new BadRequestException('updating approved coupon is not allowed');
    existingCoupon.approvalStatus = ApprovalStatusEnum.PENDING;
    existingCoupon.description = updateDto.description;
    existingCoupon.startDate = updateDto.startDate;
    existingCoupon.endDate = updateDto.endDate;
    existingCoupon.couponCode = updateDto.couponCode;
    existingCoupon.voucherLimit = updateDto.voucherLimit;
    existingCoupon.conditions = updateDto.conditions;
    existingCoupon.type = updateDto.type;
    existingCoupon.maxDiscountValue = updateDto.maxDiscountValue;
    existingCoupon.unit = updateDto.unit;
    existingCoupon.discountPercent = updateDto.discountPercent;
    return await this.repo.save(existingCoupon);
  }

  async approveCouponInfo(vendorCode: string, couponCode: string) {
    const coupon: CouponInfo = await this.findOneByVendorCodeCouponCode(
      vendorCode,
      couponCode,
    );
    coupon.approvalStatus = ApprovalStatusEnum.APPROVED;
    return await this.repo.save(coupon);
  }

  private async checkExistence(vendorCode: string, couponCode: string) {
    console.log('checking for code existance')
    try {
      const coupon = await this.findOneByVendorCodeCouponCode(
        vendorCode,
        couponCode,
      );
      if (coupon) return true;
      return false;
    } catch (err) {
      return false;
    }
  }
}
