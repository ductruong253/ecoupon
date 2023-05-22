import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomersService } from '../customers.service';
import { Customer } from '../customer.entity';

declare global {
  namespace Express {
    interface Request {
      currentCustomer?: Customer;
    }
  }
}

@Injectable()
export class CurrentCustomerMiddleware implements NestMiddleware {
  constructor(private customersService: CustomersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { customerId } = req.session || {};

    if (customerId) {
      const customer = await this.customersService.getCustomerById(customerId);
      req.currentCustomer = customer;
    }

    next();
  }
}
