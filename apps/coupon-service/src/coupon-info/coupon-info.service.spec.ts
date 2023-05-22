import { Test, TestingModule } from '@nestjs/testing';
import { CouponInfoService } from './coupon-info.service';

describe('CouponInfoService', () => {
  let service: CouponInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CouponInfoService],
    }).compile();

    service = module.get<CouponInfoService>(CouponInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
