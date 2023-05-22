import { Test, TestingModule } from '@nestjs/testing';
import { CouponInfoController } from './coupon-info.controller';

describe('CouponInfoController', () => {
  let controller: CouponInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CouponInfoController],
    }).compile();

    controller = module.get<CouponInfoController>(CouponInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
